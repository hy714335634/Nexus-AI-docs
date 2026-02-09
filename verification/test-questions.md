# 验证问题集

**创建日期**: 2026-02-05  
**最后更新**: 2026-02-06  
**文档版本**: 2.0  
**问题总数**: 25个  
**覆盖维度**: 5个（架构一致性、功能完整性、接口一致性、代码质量、文档准确性）

## 1. 验证问题概述

本文档包含25个针对Nexus-AI项目的验证问题，用于系统性地检查文档与代码实现之间的准确性和一致性。每个问题都引用了具体的模块名称、文件路径和函数名，确保可以直接对照代码库进行验证。

### 1.1 验证目标

- 确认架构文档与实际代码结构一致
- 验证功能描述与代码实现匹配
- 检查接口定义与实际暴露的API一致
- 评估代码质量和错误处理的完整性
- 核实文档中的技术细节准确无误

### 1.2 验证方法说明

每个问题包含以下要素：
- **问题描述**: 具体的验证问题
- **涉及文件**: 需要检查的代码文件路径
- **验证方法**: 如何进行验证的具体步骤
- **预期结果**: 验证通过时应该观察到的结果
- **关联文档**: 相关的文档引用

### 1.3 状态标记说明

| 状态 | 含义 |
|------|------|
| ✅ 通过 | 验证结果与预期一致 |
| ❌ 失败 | 验证结果与预期不一致 |
| ⏳ 待验证 | 尚未执行验证 |
| ⚠️ 部分通过 | 部分验证通过，存在偏差 |

---

## 2. 架构一致性验证 (5个问题)

### 问题 Q-A01: Agent Factory 模块依赖关系验证

**问题**: `nexus_utils/agent_factory.py` 中的 `create_agent_from_prompt_template()` 函数是否如架构文档所述，依赖 `PromptManager`（提示词管理）和 `ConfigLoader`（配置加载）两个核心模块？

**涉及文件**:
- `nexus_utils/agent_factory.py` — 函数 `create_agent_from_prompt_template()` (第496行)
- `nexus_utils/prompts_manager.py` — 类 `PromptManager`
- `nexus_utils/config_loader.py` — 类 `ConfigLoader` / 函数 `get_config()`

**验证方法**:
1. 检查 `agent_factory.py` 的 import 语句，确认是否导入了 `prompts_manager` 和 `config_loader`
2. 在 `create_agent_from_prompt_template()` 函数体内，确认是否调用了 `PromptManager.get_agent()` 获取提示词模板
3. 确认是否调用了 `get_config()` 或 `ConfigLoader` 获取模型配置（如 `model_id`）
4. 对照 `docs/update_content/architecture/module-dependencies.md` 中的依赖图，验证 M01→M02、M01→M08 的依赖关系

**预期结果**:
- `agent_factory.py` 顶部存在 `from nexus_utils.prompts_manager import ...` 或等效导入
- `agent_factory.py` 顶部存在 `from nexus_utils.config_loader import ...` 或等效导入
- `create_agent_from_prompt_template()` 内部使用 `PromptManager` 获取 Agent 提示词配置
- `get_bedrock_model()` 函数（第117行）使用 `ConfigLoader` 获取 Bedrock 模型配置

**关联文档**: `docs/update_content/modules/01-agent-factory.md`, `docs/update_content/architecture/module-dependencies.md`

**状态**: ⏳ 待验证

---

### 问题 Q-A02: 三端服务架构一致性验证

**问题**: 系统架构文档声称Nexus-AI采用"前后端分离 + 异步任务处理"的三端架构（Web前端、API后端、Worker），实际代码中这三个服务的入口文件和端口配置是否与文档描述一致？

**涉及文件**:
- `api/v2/main.py` — FastAPI 应用入口
- `worker/main.py` — Worker 服务入口（类 `Worker`）
- `web/` — Next.js 前端目录
- `api/v2/config.py` — API 配置（端口设置）
- `worker/config.py` — Worker 配置

**验证方法**:
1. 检查 `api/v2/main.py` 底部的 `uvicorn.run()` 调用，确认默认端口为 8000
2. 检查 `worker/main.py` 中的 `Worker` 类，确认其通过 SQS 队列消费消息（非 HTTP 服务）
3. 检查 `web/package.json` 中的 `dev` 脚本，确认前端运行在端口 3000
4. 验证 API→Worker 的通信方式确实是通过 SQS 消息队列（检查 `api/v2/database/sqs.py`）

**预期结果**:
- API 服务默认端口 8000，使用 FastAPI + Uvicorn
- Worker 服务无 HTTP 端口，通过 SQS 长轮询接收消息
- Web 前端默认端口 3000，使用 Next.js 14
- API→Worker 通过 SQS 队列 `nexus-build-queue` 通信

**关联文档**: `docs/update_content/architecture/system-architecture.md`, `docs/update_content/architecture/deployment-architecture.md`

**状态**: ⏳ 待验证

---

### 问题 Q-A03: 工作流引擎分层架构验证

**问题**: 工作流引擎是否如架构文档所述，由 `WorkflowEngine`（引擎）、`StageExecutor`（执行器）、`WorkflowContext`（上下文）三个核心组件组成，且它们之间的调用关系是否符合 Engine→Executor→Context 的分层设计？

**涉及文件**:
- `nexus_utils/workflow/engine.py` — 类 `WorkflowEngine`（第89行）
- `nexus_utils/workflow/executor.py` — 类 `StageExecutor`（第74行）
- `nexus_utils/workflow/context.py` — 类 `WorkflowContextManager`（第142行）
- `nexus_utils/workflow/models.py` — 类 `WorkflowContext`（第717行）

**验证方法**:
1. 检查 `WorkflowEngine.__init__()` 是否持有 `StageExecutor` 和 `WorkflowContext` 的引用
2. 检查 `WorkflowEngine.execute_single_stage()` 是否委托给 `StageExecutor.execute_stage()` 执行
3. 检查 `StageExecutor` 是否通过 `WorkflowContext` 获取阶段上下文信息
4. 确认 `WorkflowContext` 不直接依赖 `WorkflowEngine` 或 `StageExecutor`（避免反向依赖）

**预期结果**:
- `WorkflowEngine` 组合了 `StageExecutor` 和 `WorkflowContext`
- `StageExecutor.execute_stage()` 接收上下文参数并执行具体阶段逻辑
- `WorkflowContext`/`WorkflowContextManager` 是纯数据/状态管理层，不依赖上层组件
- 依赖方向为单向：Engine → Executor → Context

**关联文档**: `docs/update_content/modules/09-tool-system.md`, `docs/update_content/business-flows/workflow-execution.md`

**状态**: ⏳ 待验证

---

### 问题 Q-A04: MCP 模块双层架构验证

**问题**: MCP 集成是否存在文档所述的双层结构——旧版 `nexus_utils/mcp_manager.py` 和新版 `nexus_utils/mcp/` 模块包？两者的 `MCPServerConfig` 类定义是否存在冗余？

**涉及文件**:
- `nexus_utils/mcp_manager.py` — 旧版 MCP 管理器，包含 `MCPServerConfig`（第91行）、`MCPManager`（第277行）
- `nexus_utils/mcp/models.py` — 新版 MCP 数据模型，包含 `MCPServerConfig` 类
- `nexus_utils/mcp/manager.py` — 新版 MCP 管理器核心
- `nexus_utils/mcp/api.py` — MCP API 路由

**验证方法**:
1. 对比 `mcp_manager.py` 中的 `MCPServerConfig` 与 `mcp/models.py` 中的 `MCPServerConfig`，检查字段定义是否一致
2. 检查 `api/v2/main.py` 中注册的 MCP 路由来源（是 `nexus_utils/mcp/api.py` 还是 `mcp_manager.py`）
3. 检查 Agent Factory 中使用的 MCP 管理器是哪个版本
4. 确认是否存在两套并行的 MCP 配置管理逻辑

**预期结果**:
- 存在两个 `MCPServerConfig` 类定义（`mcp_manager.py` 第91行和 `mcp/models.py`）
- `api/v2/main.py` 导入的是 `nexus_utils.mcp.api` 中的 `router`（新版）
- 两个版本的 `MCPServerConfig` 字段存在差异（如传输类型枚举 `TransportType`）
- 这是一个已知的代码冗余问题

**关联文档**: `docs/update_content/modules/03-mcp-integration.md`, `docs/update_content/code-analysis/redundancy-analysis.md`

**状态**: ⏳ 待验证

---

### 问题 Q-A05: API 路由注册与 v1/v2 兼容性验证

**问题**: `api/v2/main.py` 中是否如架构文档所述，同时注册了 `/api/v1` 和 `/api/v2` 两套路由前缀以实现向后兼容？所有路由模块是否都进行了双重注册？

**涉及文件**:
- `api/v2/main.py` — FastAPI 应用入口，路由注册区域
- `api/v2/routers/` — 所有路由模块目录
- `nexus_utils/mcp/api.py` — MCP 路由（`router` 变量）

**验证方法**:
1. 在 `api/v2/main.py` 中搜索所有 `app.include_router()` 调用
2. 统计使用 `prefix="/api/v2"` 注册的路由数量
3. 统计使用 `prefix="/api/v1"` 注册的路由数量
4. 确认两组注册的路由模块列表是否完全一致
5. 特别检查 `mcp_router` 是否同时注册在 v1 和 v2 前缀下

**预期结果**:
- 所有业务路由（projects、agents、sessions、tasks、statistics 等）均注册在 `/api/v1` 和 `/api/v2` 两个前缀下
- `mcp_router`（来自 `nexus_utils.mcp.api`）同时注册在两个前缀下
- `auth_router` 同时注册在两个前缀下
- v1 路由映射到与 v2 相同的处理器，实现向后兼容

**关联文档**: `docs/update_content/modules/06-api-system.md`, `docs/update_content/api-reference/rest-api-v2.md`

**状态**: ⏳ 待验证

---

## 3. 功能完整性验证 (5个问题)

### 问题 Q-F01: Agent 创建流程完整性验证

**问题**: `create_agent_from_prompt_template()` 函数是否完整实现了"加载提示词模板 → 解析工具依赖 → 创建 Bedrock 模型 → 实例化 Agent"的完整创建流程？是否支持 MCP 工具集成？

**涉及文件**:
- `nexus_utils/agent_factory.py` — 函数 `create_agent_from_prompt_template()`（第496行）
- `nexus_utils/agent_factory.py` — 函数 `import_tools_by_strings()`（第444行）
- `nexus_utils/agent_factory.py` — 函数 `get_bedrock_model()`（第117行）
- `nexus_utils/agent_factory.py` — 函数 `get_tool_by_path()`（第227行）

**验证方法**:
1. 追踪 `create_agent_from_prompt_template()` 的执行流程
2. 确认步骤1: 通过 `PromptManager.get_agent()` 加载 YAML 提示词模板
3. 确认步骤2: 通过 `get_agent_tools_dependencies()` 获取工具依赖列表
4. 确认步骤3: 通过 `import_tools_by_strings()` 动态导入工具
5. 确认步骤4: 通过 `get_bedrock_model()` 创建 Bedrock 模型实例
6. 确认步骤5: 使用 `Agent()` 构造函数创建最终 Agent 实例
7. 检查是否支持 MCP 依赖（通过 `get_agent_mcp_dependencies()`）

**预期结果**:
- 函数接受 `prompt_template_path` 参数指定提示词模板路径
- 内部调用 `PromptManager` 加载并解析 YAML 模板
- 自动解析 `metadata.tools_dependencies` 字段加载工具
- 支持 `metadata.mcp_dependencies` 字段加载 MCP 工具
- 返回完整配置的 `Agent` 实例

**关联文档**: `docs/update_content/modules/01-agent-factory.md`, `docs/update_content/business-flows/agent-creation-process.md`

**状态**: ⏳ 待验证

---

### 问题 Q-F02: 多模态处理格式支持完整性验证

**问题**: `ContentParsingEngine` 是否支持配置文件 `config/default_config.yaml` 中 `multimodal_parser.file_limits.supported_formats` 声明的所有文件格式（jpg、jpeg、png、gif、txt、xlsx、docx、csv）？

**涉及文件**:
- `nexus_utils/multimodal_processing/content_parsing_engine.py` — 类 `ContentParsingEngine`，方法 `get_supported_file_types()`（第140行）、`_build_processor_map()`（第272行）
- `nexus_utils/multimodal_processing/image_processor.py` — 图像处理器
- `nexus_utils/multimodal_processing/document_processor.py` — 文档处理器
- `nexus_utils/multimodal_processing/text_processor.py` — 文本处理器
- `config/default_config.yaml` — `multimodal_parser.file_limits.supported_formats` 配置项

**验证方法**:
1. 读取 `config/default_config.yaml` 中的 `supported_formats` 列表
2. 检查 `ContentParsingEngine._build_processor_map()` 返回的处理器映射
3. 确认每种声明的格式都有对应的处理器：
   - jpg/jpeg/png/gif → `ImageProcessor`
   - xlsx → `DocumentProcessor`
   - docx → `DocumentProcessor`
   - txt/csv → `TextProcessor`
4. 检查 `get_supported_file_types()` 返回的列表是否包含所有8种格式

**预期结果**:
- 配置文件声明支持 8 种格式: `["jpg", "jpeg", "png", "gif", "txt", "xlsx", "docx", "csv"]`
- `_build_processor_map()` 为每种格式注册了对应的处理器
- 图像格式由 `ImageProcessor` 处理
- 文档格式（xlsx、docx）由 `DocumentProcessor` 处理
- 文本格式（txt、csv）由 `TextProcessor` 处理

**关联文档**: `docs/update_content/modules/04-multimodal-processing.md`, `docs/update_content/business-flows/content-processing.md`

**状态**: ⏳ 待验证

---

### 问题 Q-F03: Agent Build Workflow 阶段完整性验证

**问题**: Agent 构建工作流是否包含文档所述的所有专业角色 Agent？`agents/system_agents/agent_build_workflow/` 目录下的文件是否与文档描述的阶段一一对应？

**涉及文件**:
- `agents/system_agents/agent_build_workflow/` — 工作流目录
- `agents/system_agents/agent_build_workflow/requirements_analyzer_agent.py` — 需求分析
- `agents/system_agents/agent_build_workflow/system_architect_agent.py` — 系统架构
- `agents/system_agents/agent_build_workflow/agent_designer_agent.py` — Agent 设计
- `agents/system_agents/agent_build_workflow/prompt_engineer_agent.py` — 提示词工程
- `agents/system_agents/agent_build_workflow/tool_developer_agent.py` — 工具开发
- `agents/system_agents/agent_build_workflow/agent_code_developer_agent.py` — 代码开发
- `agents/system_agents/agent_build_workflow/agent_developer_manager_agent.py` — 开发管理
- `agents/system_agents/agent_build_workflow/agent_deployer_agent.py` — 部署

**验证方法**:
1. 列出 `agents/system_agents/agent_build_workflow/` 目录下所有 `*_agent.py` 文件
2. 与文档描述的8个专业角色进行对比
3. 检查 `agent_build_workflow.py`（主编排文件）是否引用了所有阶段 Agent
4. 检查 `nexus_utils/workflow/models.py` 中 `_get_stage_sequence()` 函数定义的阶段顺序

**预期结果**:
- 目录下存在8个专业角色 Agent 文件（不含主编排文件 `agent_build_workflow.py` 和 `run_workflow_v2.py`）
- 文档声称"7阶段"或"9阶段"流程，实际文件数量应与之匹配
- 注意：文档中部分地方说"7阶段"，部分说"9阶段"，需确认实际阶段数
- `_get_stage_sequence("agent_build")` 返回的阶段列表应与实际 Agent 文件对应

**关联文档**: `docs/update_content/modules/05-agent-build-workflow.md`, `docs/update_content/business-flows/agent-creation-process.md`

**状态**: ⏳ 待验证

---

### 问题 Q-F04: MCP 传输类型完整性验证

**问题**: MCP 模块是否支持文档声明的所有三种传输类型（stdio、sse、http）？`MCPServerConfig` 的验证逻辑是否正确区分了不同传输类型的必需字段？

**涉及文件**:
- `nexus_utils/mcp/models.py` — 枚举 `TransportType`、类 `MCPServerConfig`、方法 `validate()`
- `nexus_utils/mcp/client_factory.py` — 类 `MCPClientFactory`、方法 `create_client()`
- `nexus_utils/mcp_manager.py` — 类 `MCPClientFactory`（旧版）、方法 `create_client()`

**验证方法**:
1. 检查 `nexus_utils/mcp/models.py` 中 `TransportType` 枚举是否包含 STDIO、SSE、HTTP 三个值
2. 检查 `MCPServerConfig.validate()` 方法的逻辑：
   - STDIO 类型是否要求 `command` 字段非空
   - SSE 类型是否要求 `url` 字段非空
   - HTTP 类型是否要求 `url` 字段非空
3. 检查 `MCPClientFactory.create_client()` 是否针对三种传输类型分别创建不同的客户端
4. 对比旧版 `mcp_manager.py` 中的传输类型支持是否一致

**预期结果**:
- `TransportType` 枚举定义: `STDIO = "stdio"`, `SSE = "sse"`, `HTTP = "http"`
- `validate()` 方法: STDIO 需要 `command`，SSE/HTTP 需要 `url`
- `MCPClientFactory` 能够为三种传输类型创建对应的 MCP 客户端
- 旧版 `mcp_manager.py` 可能不支持 HTTP 传输类型（需验证）

**关联文档**: `docs/update_content/modules/03-mcp-integration.md`, `docs/update_content/api-reference/mcp-tools-reference.md`

**状态**: ⏳ 待验证

---

### 问题 Q-F05: Worker 消息处理与心跳机制验证

**问题**: Worker 服务是否实现了文档所述的 SQS 消息消费、心跳续期和优雅关闭机制？`WorkflowHandler` 是否是实际使用的消息处理器？

**涉及文件**:
- `worker/main.py` — 类 `Worker`，方法 `_poll_and_process()`、`_process_message()`、`_start_heartbeat()`、`_signal_handler()`
- `worker/handlers/workflow_handler.py` — 类 `WorkflowHandler`
- `worker/config.py` — Worker 配置（`POLL_INTERVAL_SECONDS`、`VISIBILITY_TIMEOUT`、`HEARTBEAT_INTERVAL`）

**验证方法**:
1. 检查 `Worker.__init__()` 中 `queue_type == "build"` 分支是否使用 `WorkflowHandler`（而非 `BuildHandler`）
2. 检查 `_poll_and_process()` 是否调用 `sqs_client.receive_messages()` 进行长轮询
3. 检查 `_start_heartbeat()` 是否通过 `sqs_client.change_message_visibility()` 延长消息可见性
4. 检查 `_signal_handler()` 是否支持 SIGINT/SIGTERM 信号的优雅关闭
5. 确认 `deploy` 队列类型的处理器是否为 `None`（TODO 状态）

**预期结果**:
- `build` 队列使用 `WorkflowHandler`（非 `BuildHandler`）处理消息
- `deploy` 队列的 `handler` 为 `None`，标记为 TODO
- 心跳线程定期调用 `change_message_visibility()` 延长超时
- 支持 SIGINT/SIGTERM 信号，第一次优雅关闭，第二次强制退出
- 消息处理成功后调用 `delete_message()` 确认消费

**关联文档**: `docs/update_content/modules/07-worker-system.md`

**状态**: ⏳ 待验证

---

## 4. 接口一致性验证 (5个问题)

### 问题 Q-I01: PromptManager 单例模式与注册表一致性验证

**问题**: `PromptManager` 和 `PromptManagerRegistry` 是否正确实现了单例模式？`get_prompt_manager()` 和 `get_default_prompt_manager()` 两个全局函数的行为是否一致？

**涉及文件**:
- `nexus_utils/prompts_manager.py` — 类 `PromptManager`（`__new__` 方法，第128行）
- `nexus_utils/prompts_manager.py` — 类 `PromptManagerRegistry`（第535行）
- `nexus_utils/prompts_manager.py` — 函数 `get_prompt_manager()`（第564行）
- `nexus_utils/prompts_manager.py` — 函数 `get_default_prompt_manager()`（第568行）

**验证方法**:
1. 检查 `PromptManager.__new__()` 是否实现了单例逻辑
2. 检查 `PromptManagerRegistry.get_instance()` 和 `get_default_instance()` 的实现
3. 对比 `get_prompt_manager()` 和 `get_default_prompt_manager()` 的返回值是否为同一实例
4. 检查是否存在两套并行的单例管理机制（`__new__` 和 `Registry`）

**预期结果**:
- `PromptManager.__new__()` 通过类变量缓存实例实现单例
- `PromptManagerRegistry` 提供另一套基于注册表的实例管理
- 两套机制可能存在不一致风险（同一个类两种单例实现）
- `get_prompt_manager()` 和 `get_default_prompt_manager()` 应返回相同实例

**关联文档**: `docs/update_content/modules/02-prompt-management.md`, `docs/update_content/code-analysis/redundancy-analysis.md`

**状态**: ⏳ 待验证

---

### 问题 Q-I02: ConfigLoader 配置获取接口一致性验证

**问题**: `ConfigLoader` 类提供了多种配置获取方法（`get()`、`get_section()`、`get_nested()`、`get_with_env_override()`），这些方法的参数风格和返回值类型是否一致？各个 `get_*_config()` 便捷方法是否都返回 `Dict[str, Any]` 类型？

**涉及文件**:
- `nexus_utils/config_loader.py` — 类 `ConfigLoader`（第17行）
- 方法列表: `get()`(第87行)、`get_section()`(第101行)、`get_nested()`(第115行)、`get_with_env_override()`(第141行)
- 便捷方法: `get_aws_config()`(第179行)、`get_bedrock_config()`(第188行)、`get_strands_config()`(第197行)、`get_dynamodb_config()`(第316行)、`get_sqs_config()`(第356行)、`get_mcp_config()`(第233行)、`get_multimodal_parser_config()`(第242行)

**验证方法**:
1. 检查所有 `get_*_config()` 方法的返回类型注解是否都是 `Dict[str, Any]`
2. 检查 `get()` 和 `get_section()` 的 `default` 参数默认值是否一致（都是 `None`）
3. 检查 `get_nested()` 是否使用 `*keys` 可变参数，与 `get()` 的单 key 参数风格不同
4. 检查 `get_with_env_override()` 是否优先使用环境变量覆盖配置值
5. 确认 `reload_config()` 方法是否会使所有缓存的配置失效

**预期结果**:
- 所有 `get_*_config()` 便捷方法返回类型为 `Dict[str, Any]`
- `get()` 接受单个 `key` 字符串参数
- `get_nested()` 接受多个 `*keys` 参数用于嵌套访问
- `get_with_env_override()` 优先级: 环境变量 > 配置文件 > 默认值
- `reload_config()` 重新加载 YAML 文件

**关联文档**: `docs/update_content/modules/08-configuration-management.md`, `docs/update_content/api-reference/internal-apis.md`

**状态**: ⏳ 待验证

---

### 问题 Q-I03: MCP API 路由与 MCP Manager 接口一致性验证

**问题**: `nexus_utils/mcp/api.py` 中定义的 REST API 端点是否与 `MCPManager` 类提供的方法一一对应？API 层是否只是 Manager 层的薄封装？

**涉及文件**:
- `nexus_utils/mcp/api.py` — API 路由函数: `list_servers()`、`get_server()`、`create_server()`、`update_server()`、`delete_server()`、`test_connection()`、`list_tools()`、`enable_server()`、`disable_server()`
- `nexus_utils/mcp/manager.py` — MCP 管理器核心
- `nexus_utils/mcp_manager.py` — 旧版 MCP 管理器: `MCPManager` 类方法 `get_all_servers()`、`get_server_config()`、`get_enabled_servers()`

**验证方法**:
1. 列出 `mcp/api.py` 中所有 API 端点及其 HTTP 方法
2. 检查每个 API 端点内部调用的是 `mcp/manager.py` 还是 `mcp_manager.py` 的方法
3. 确认 `create_server()`、`update_server()`、`delete_server()` 等写操作是否有对应的 Manager 方法
4. 检查 `test_connection()` API 是否调用了 `MCPClientFactory.create_client()` 进行实际连接测试

**预期结果**:
- API 层（`mcp/api.py`）调用的是新版 `mcp/manager.py` 中的管理器
- 读操作: `list_servers` → `get_all_servers()`，`get_server` → `get_server_config()`
- 写操作: `create_server`、`update_server`、`delete_server` 有对应的持久化逻辑
- `test_connection` 实际创建 MCP 客户端连接并验证
- `enable_server`/`disable_server` 修改 `MCPServerConfig.disabled` 字段

**关联文档**: `docs/update_content/modules/03-mcp-integration.md`, `docs/update_content/api-reference/mcp-tools-reference.md`

**状态**: ⏳ 待验证

---

### 问题 Q-I04: 工具加载接口一致性验证

**问题**: `agent_factory.py` 中提供了多种工具加载函数（`get_tool_by_path()`、`get_tool_by_name()`、`import_tools_by_strings()`），它们的输入格式和返回类型是否一致？是否存在功能重叠？

**涉及文件**:
- `nexus_utils/agent_factory.py` — 函数 `get_tool_by_path()`（第227行）
- `nexus_utils/agent_factory.py` — 函数 `get_tool_by_name()`（第355行）
- `nexus_utils/agent_factory.py` — 函数 `import_tools_by_strings()`（第444行）
- `nexus_utils/agent_factory.py` — 函数 `get_builtin_tools_mapping()`（第162行）
- `nexus_utils/agent_factory.py` — 函数 `get_system_tools_mapping()`（第183行）

**验证方法**:
1. 检查 `get_tool_by_path()` 的参数格式（如 `"tools.system_tools.xxx.func_name"`）和返回类型
2. 检查 `get_tool_by_name()` 的参数格式（如 `"calculator"`）和返回类型
3. 检查 `import_tools_by_strings()` 接受的列表格式和返回的工具列表
4. 确认三个函数是否都返回可调用的工具对象
5. 检查 `get_builtin_tools_mapping()` 和 `get_system_tools_mapping()` 返回的映射结构

**预期结果**:
- `get_tool_by_path()`: 接受完整模块路径字符串，返回单个工具函数
- `get_tool_by_name()`: 接受工具短名称，通过内置映射查找，返回单个工具函数
- `import_tools_by_strings()`: 接受路径列表，返回工具函数列表
- 三者存在功能重叠：`import_tools_by_strings()` 内部可能调用 `get_tool_by_path()` 或 `get_tool_by_name()`
- `get_builtin_tools_mapping()` 返回 Strands 内置工具映射
- `get_system_tools_mapping()` 返回系统自定义工具映射

**关联文档**: `docs/update_content/modules/01-agent-factory.md`, `docs/update_content/modules/09-tool-system.md`

**状态**: ⏳ 待验证

---

### 问题 Q-I05: safe_agent_factory 与 agent_factory 接口关系验证

**问题**: `nexus_utils/safe_agent_factory.py` 中的 `create_validated_agent()` 和 `create_agent_with_fallback()` 是否是对 `agent_factory.py` 中 `create_agent_from_prompt_template()` 的安全封装？两者的参数接口是否兼容？

**涉及文件**:
- `nexus_utils/safe_agent_factory.py` — 函数 `create_validated_agent()`（第21行）、`create_agent_with_fallback()`（第134行）、`batch_create_agents()`（第179行）、`get_agent_health_status()`（第239行）
- `nexus_utils/agent_factory.py` — 函数 `create_agent_from_prompt_template()`（第496行）

**验证方法**:
1. 检查 `create_validated_agent()` 是否内部调用 `create_agent_from_prompt_template()`
2. 对比两个函数的参数列表，确认 `safe_agent_factory` 是否添加了额外的验证参数
3. 检查 `create_agent_with_fallback()` 的降级逻辑（如模型不可用时的回退策略）
4. 检查 `batch_create_agents()` 是否支持批量创建并返回成功/失败结果
5. 确认 `get_agent_health_status()` 返回的健康状态字典结构

**预期结果**:
- `create_validated_agent()` 在调用 `create_agent_from_prompt_template()` 前后添加了验证逻辑
- `create_agent_with_fallback()` 在创建失败时尝试使用备选模型（如从 Sonnet 降级到 Haiku）
- `batch_create_agents()` 接受多个模板路径，返回创建结果列表
- `get_agent_health_status()` 返回包含 Agent 状态信息的字典
- 两个模块的参数接口基本兼容，`safe_agent_factory` 是增强层

**关联文档**: `docs/update_content/modules/01-agent-factory.md`, `docs/update_content/code-analysis/redundancy-analysis.md`

**状态**: ⏳ 待验证

---

## 5. 代码质量验证 (5个问题)

### 问题 Q-Q01: Worker 异常处理完整性验证

**问题**: `worker/main.py` 中的消息处理流程是否在所有关键路径上都有异常处理？心跳线程异常是否会导致消息处理中断？

**涉及文件**:
- `worker/main.py` — 方法 `_poll_and_process()`、`_process_message()`、`_start_heartbeat()`

**验证方法**:
1. 检查 `_poll_and_process()` 中 `sqs_client.receive_messages()` 调用是否有 try-except 包裹
2. 检查 `_process_message()` 中 `self.handler.handle(message)` 调用是否有异常处理
3. 检查心跳线程中 `change_message_visibility()` 失败时是否会 break 退出循环
4. 确认 `_process_message()` 的 finally 块是否正确取消心跳线程
5. 检查消息处理失败时是否正确地让消息重新可见（不调用 `delete_message`）

**预期结果**:
- `_poll_and_process()` 有 try-except，异常后 `time.sleep(5)` 等待重试
- `_process_message()` 有 try-except-finally，finally 中取消心跳线程
- 心跳线程异常时 break 退出，不影响主消息处理
- 处理失败时不删除消息，消息在可见性超时后自动重新可见
- 所有异常都通过 `logger.error()` 记录，包含 `exc_info=True`

**关联文档**: `docs/update_content/modules/07-worker-system.md`, `docs/update_content/code-analysis/logic-gaps.md`

**状态**: ⏳ 待验证

---

### 问题 Q-Q02: 多模态处理模块延迟导入机制验证

**问题**: `nexus_utils/multimodal_processing/__init__.py` 使用延迟导入函数（如 `get_content_parsing_engine()`）避免循环依赖，这种模式是否在所有处理器中一致使用？是否存在直接导入导致的循环依赖风险？

**涉及文件**:
- `nexus_utils/multimodal_processing/__init__.py` — 延迟导入函数定义
- `nexus_utils/multimodal_processing/content_parsing_engine.py` — `ContentParsingEngine` 类
- `nexus_utils/multimodal_processing/image_processor.py` — `ImageProcessor` 类
- `nexus_utils/multimodal_processing/document_processor.py` — `DocumentProcessor` 类
- `nexus_utils/multimodal_processing/text_processor.py` — `TextProcessor` 类

**验证方法**:
1. 检查 `__init__.py` 中是否所有处理器类都通过延迟导入函数暴露（`get_*` 模式）
2. 确认 `__init__.py` 顶部只导入了 `models/` 子包（数据模型）
3. 检查 `content_parsing_engine.py` 是否直接导入了处理器类（而非通过 `__init__.py`）
4. 检查各处理器之间是否存在交叉导入
5. 确认 `__all__` 列表是否包含所有延迟导入函数

**预期结果**:
- `__init__.py` 顶部仅导入 `models.data_models`、`models.exceptions`、`models.interfaces`
- 提供 8 个延迟导入函数: `get_multimodal_model_service()`、`get_content_parsing_engine()`、`get_document_processor()`、`get_image_processor()`、`get_text_processor()`、`get_markdown_generator()`、`get_s3_storage_service()`、`get_file_upload_manager()`、`get_error_handler()`
- `ContentParsingEngine` 内部可能直接导入处理器（绕过延迟导入）
- 延迟导入模式有效避免了模块级循环依赖

**关联文档**: `docs/update_content/modules/04-multimodal-processing.md`, `docs/update_content/code-analysis/improvement-suggestions.md`

**状态**: ⏳ 待验证

---

### 问题 Q-Q03: API 全局异常处理与请求追踪验证

**问题**: `api/v2/main.py` 中的全局异常处理器和请求 ID 中间件是否能确保所有未捕获异常都返回统一的错误格式？请求 ID 是否贯穿整个请求生命周期？

**涉及文件**:
- `api/v2/main.py` — 中间件 `add_request_id()`、异常处理器 `global_exception_handler()`
- `api/v2/core/exceptions.py` — 自定义异常定义

**验证方法**:
1. 检查 `add_request_id` 中间件是否为每个请求生成 UUID 并存储在 `request.state.request_id`
2. 检查响应头是否包含 `X-Request-ID` 和 `X-Process-Time`
3. 检查 `global_exception_handler()` 是否捕获所有 `Exception` 类型
4. 确认错误响应格式是否统一为 `{"success": False, "error": {"code": "INTERNAL_ERROR", "message": "...", "request_id": "..."}}`
5. 检查是否存在其他路由级别的异常处理器可能覆盖全局处理器

**预期结果**:
- 每个请求自动分配 UUID 格式的 `request_id`
- 响应头包含 `X-Request-ID` 和 `X-Process-Time`（处理耗时，单位秒）
- 全局异常处理器返回 HTTP 500，包含统一的错误 JSON 结构
- 异常日志包含 `exc_info=True` 和 `request_id`
- 健康检查端点 `/health` 检查 DynamoDB 和 SQS 连接状态

**关联文档**: `docs/update_content/modules/06-api-system.md`, `docs/update_content/api-reference/rest-api-v2.md`

**状态**: ⏳ 待验证

---

### 问题 Q-Q04: ConfigLoader 单例模式与配置热重载验证

**问题**: `ConfigLoader` 通过 `get_config()` 全局函数提供单例访问，`reload_config()` 方法是否能正确重新加载配置而不破坏单例引用？是否存在线程安全问题？

**涉及文件**:
- `nexus_utils/config_loader.py` — 函数 `get_config()`（第424行）、类 `ConfigLoader`、方法 `reload_config()`（第414行）

**验证方法**:
1. 检查 `get_config()` 是否使用模块级变量缓存 `ConfigLoader` 实例
2. 检查 `reload_config()` 是否重新调用 `_load_config()` 更新内部配置字典
3. 确认 `reload_config()` 后，已持有的 `ConfigLoader` 引用是否能获取到新配置
4. 检查是否有线程锁保护配置读写操作
5. 检查 `_load_config()` 中 YAML 文件路径的解析逻辑

**预期结果**:
- `get_config()` 返回全局单例 `ConfigLoader` 实例
- `reload_config()` 重新读取 `config/default_config.yaml` 并更新内部 `self.config` 字典
- 重载后所有通过同一实例访问的配置都会更新
- 可能缺少线程安全保护（无锁机制）
- 默认配置文件路径为 `config/default_config.yaml`

**关联文档**: `docs/update_content/modules/08-configuration-management.md`, `docs/update_content/code-analysis/logic-gaps.md`

**状态**: ⏳ 待验证

---

### 问题 Q-Q05: WorkflowContext 阶段状态管理完整性验证

**问题**: `WorkflowContext` 类是否正确管理工作流阶段的状态转换？`StageStatus` 枚举是否覆盖了所有可能的阶段状态？`get_next_stage()` 是否正确跳过已完成的阶段？

**涉及文件**:
- `nexus_utils/workflow/models.py` — 类 `WorkflowContext`（第717行）、枚举 `StageStatus`（第90行）、枚举 `ControlStatus`（第110行）
- `nexus_utils/workflow/models.py` — 方法 `get_completed_stages()`（第788行）、`get_pending_stages()`（第803行）、`get_next_stage()`（第813行）、`are_prerequisites_completed()`（第866行）

**验证方法**:
1. 检查 `StageStatus` 枚举包含的状态值（如 PENDING、RUNNING、COMPLETED、FAILED、SKIPPED）
2. 检查 `ControlStatus` 枚举包含的控制状态（如 RUNNING、PAUSED、STOPPED）
3. 检查 `get_next_stage()` 是否遍历 `STAGE_ORDER` 并返回第一个未完成的阶段
4. 检查 `are_prerequisites_completed()` 是否正确检查前置阶段的完成状态
5. 检查 `update_stage_output()` 是否同时更新阶段状态和输出内容

**预期结果**:
- `StageStatus` 包含至少 PENDING、RUNNING、COMPLETED、FAILED 四种状态
- `ControlStatus` 包含 RUNNING、PAUSED、STOPPED 等控制状态
- `get_next_stage()` 按 `STAGE_ORDER` 顺序查找第一个非 COMPLETED 状态的阶段
- `are_prerequisites_completed()` 检查当前阶段之前所有阶段是否已完成
- `WorkflowContext.to_dict()` 和 `from_dict()` 支持完整的序列化/反序列化

**关联文档**: `docs/update_content/modules/09-tool-system.md`, `docs/update_content/business-flows/workflow-execution.md`

**状态**: ⏳ 待验证

---

## 6. 文档准确性验证 (5个问题)

### 问题 Q-D01: 配置文件结构与文档描述一致性验证

**问题**: `config/default_config.yaml` 的实际配置结构是否与文档中描述的配置层次一致？文档中列出的所有配置节（aws、strands、bedrock、dynamodb、sqs、multimodal_parser）是否都存在于实际配置文件中？

**涉及文件**:
- `config/default_config.yaml` — 实际配置文件
- `docs/update_content/modules/08-configuration-management.md` — 配置管理文档

**验证方法**:
1. 读取 `config/default_config.yaml`，列出所有顶级配置节
2. 与文档中描述的配置节列表进行对比
3. 特别检查以下配置节是否存在：
   - `default-config.aws` — AWS 基础配置
   - `default-config.strands` — Strands 框架配置（template/generated/system 三个子节）
   - `default-config.bedrock` — Bedrock 模型配置（model_id、lite_model_id、pro_model_id）
   - `default-config.dynamodb` — DynamoDB 表配置
   - `default-config.sqs` — SQS 队列配置
   - `default-config.multimodal_parser` — 多模态解析器配置
   - `default-config.nexus_ai` — Nexus-AI 平台配置
   - `default-config.agentcore` — AgentCore 部署配置
   - `default-config.workflow` — 工作流配置
   - `default-config.logging` — 日志配置
4. 检查文档是否遗漏了某些实际存在的配置节

**预期结果**:
- 实际配置文件包含 `nexus_ai`、`workflow`、`aws`、`strands`、`agentcore`、`bedrock`、`logging`、`dynamodb`、`sqs`、`multimodal_parser` 共10个主要配置节
- `strands` 节包含 `template`、`generated`、`system` 三个子节
- `bedrock` 节包含三个模型 ID: `model_id`（Sonnet）、`lite_model_id`（Haiku）、`pro_model_id`（Opus）
- `dynamodb.tables` 配置文件中定义了 4 张核心表: projects、stages、tasks、agents（其余 5 张表 invocations、sessions、messages、tools、artifacts 在代码中通过 `infrastructure_manager.py` 定义）
- `sqs.queues` 包含 3 个队列: build、deploy、notification（另有 2 个死信队列 build-dlq、deploy-dlq 在代码中定义）

**关联文档**: `docs/update_content/modules/08-configuration-management.md`

**状态**: ⏳ 待验证

---

### 问题 Q-D02: DynamoDB 表结构与文档描述一致性验证

**问题**: 文档中描述的 DynamoDB 表结构（PK/SK 设计）是否与 `nexus_utils/cli/managers/infrastructure_manager.py` 和 `api/v2/config.py` 中的实际实现一致？

**涉及文件**:
- `config/default_config.yaml` — `dynamodb.tables` 配置（定义 4 张核心表）
- `nexus_utils/cli/managers/infrastructure_manager.py` — 基础设施初始化（定义全部 9 张表）
- `api/v2/config.py` — 表名常量和队列定义

**验证方法**:
1. 从 `infrastructure_manager.py` 的 `get_table_definitions()` 方法提取全部 9 张表的定义
2. 检查 `api/v2/config.py` 中的表名常量是否与之一致
3. 使用 `./nexus-cli init` 命令验证基础设施初始化
4. 与文档中的表结构对比：

| 表名 | PK | SK | GSI | 用途 |
|------|----|----|-----|------|
| `nexus_projects` | project_id | — | — | 项目基本信息 |
| `nexus_stages` | project_id | stage_name | — | 工作流阶段状态 |
| `nexus_agents` | agent_id | — | — | Agent 配置和版本 |
| `nexus_invocations` | invocation_id | — | AgentIndex (agent_id) | Agent 调用记录 |
| `nexus_sessions` | session_id | — | AgentIndex (agent_id) | 会话信息 |
| `nexus_messages` | session_id | message_id | — | 会话消息记录 |
| `nexus_tasks` | task_id | — | — | 异步任务状态 |
| `nexus_tools` | tool_id | — | — | 工具注册信息 |
| `nexus_artifacts` | agent_name | version_uuid | WorkspaceIndex (workspace_uuid + created_at) | Agent 版本和 S3 同步 |

**预期结果**:
- 系统共定义 9 张表，表名前缀为 `nexus_`
- 基础设施通过 `./nexus-cli init` 初始化（`init_infrastructure.py` 已废弃）
- `invocations` 和 `sessions` 表有 AgentIndex GSI
- `artifacts` 表有 WorkspaceIndex GSI

**关联文档**: `docs/update_content/modules/06-api-system.md`, `docs/update_content/architecture/data-flow.md`

**状态**: ⏳ 待验证

---

### 问题 Q-D03: API 路由端点与文档列表完整性验证

**问题**: `docs/update_content/api-reference/rest-api-v2.md` 中列出的所有 API 端点是否都在 `api/v2/routers/` 目录下的路由文件中有实际实现？是否存在文档中未列出但代码中已实现的端点？

**涉及文件**:
- `api/v2/routers/agents.py` — Agent 管理路由
- `api/v2/routers/projects.py` — 项目管理路由
- `api/v2/routers/sessions.py` — 会话管理路由
- `api/v2/routers/agent_files.py` — Agent 文件路由
- `api/v2/routers/agent_tools.py` — 工具路由
- `api/v2/routers/workflows.py` — 工作流路由
- `api/v2/routers/workflow_control.py` — 工作流控制路由
- `api/v2/routers/statistics.py` — 统计路由
- `api/v2/routers/tasks.py` — 任务路由
- `api/v2/routers/auth.py` — 认证路由
- `api/v2/routers/config.py` — 配置路由
- `api/v2/routers/agentcore.py` — AgentCore 代理路由
- `api/v2/routers/agent_graph.py` — Agent 图谱路由
- `nexus_utils/mcp/api.py` — MCP 路由

**验证方法**:
1. 从每个路由文件中提取所有 `@router.get()`、`@router.post()`、`@router.put()`、`@router.delete()` 装饰器定义的端点
2. 与 `docs/update_content/api-reference/rest-api-v2.md` 中的端点列表进行对比
3. 标记文档中有但代码中缺失的端点
4. 标记代码中有但文档中未列出的端点
5. 特别检查 `agent_graph.py` 和 `agentcore.py` 是否在文档中有记录

**预期结果**:
- 文档应覆盖所有 14 个路由文件中定义的端点
- 可能存在文档遗漏的端点（如 `agent_graph` 路由、`agentcore` 代理路由）
- 可能存在文档中列出但实际未实现的端点
- MCP 路由（`/mcp/*`）应在文档中有完整记录

**关联文档**: `docs/update_content/api-reference/rest-api-v2.md`, `docs/update_content/modules/06-api-system.md`

**状态**: ⏳ 待验证

---

### 问题 Q-D04: 模块文档中核心函数/类列表准确性验证

**问题**: 各模块文档中列出的"核心函数/类"列表是否与实际代码中的公共接口一致？是否遗漏了重要的公共函数或类？

**涉及文件**:
- `docs/update_content/modules/01-agent-factory.md` — 应列出: `create_agent_from_prompt_template()`、`get_tool_by_path()`、`get_tool_by_name()`、`import_tools_by_strings()`、`get_bedrock_model()`、`list_available_agents()`、`list_available_agent_paths()`、`add_logging_hook_to_agent()`
- `docs/update_content/modules/02-prompt-management.md` — 应列出: `PromptManager`、`PromptAgent`、`PromptManagerRegistry`、`get_prompt_manager()`、`get_default_prompt_manager()`
- `docs/update_content/modules/03-mcp-integration.md` — 应列出: `MCPManager`、`MCPClientFactory`、`MCPServerConfig`（两个版本）、`MCPManagerRegistry`、`get_mcp_manager()`
- `docs/update_content/modules/08-configuration-management.md` — 应列出: `ConfigLoader`、`get_config()`

**验证方法**:
1. 对每个模块文档，提取其"核心函数/类"章节中列出的名称
2. 对照实际代码文件中的公共函数和类定义
3. 标记文档中列出但代码中不存在的项（幽灵引用）
4. 标记代码中存在但文档中未列出的重要公共接口
5. 特别检查 `safe_agent_factory.py`、`agent_validation.py`、`workflow_config.py` 等辅助模块是否在文档中有提及

**预期结果**:
- Agent Factory 文档应包含至少 8 个核心函数
- Prompt Management 文档应包含 `PromptManager`、`PromptAgent` 等核心类
- 可能遗漏的模块: `safe_agent_factory.py`（安全创建）、`strands_agent_logging_hook.py`（日志钩子）、`workflow_report_generator.py`（报告生成）
- 文档中的函数签名应与代码中的实际签名一致

**关联文档**: 各模块文档 `docs/update_content/modules/01-*.md` 至 `10-*.md`

**状态**: ⏳ 待验证

---

### 问题 Q-D05: 架构图中模块关系与实际 import 依赖一致性验证

**问题**: `docs/update_content/architecture/module-dependencies.md` 中的 Mermaid 依赖图是否准确反映了代码中的实际 import 关系？是否存在图中未标注的隐式依赖？

**涉及文件**:
- `docs/update_content/architecture/module-dependencies.md` — 模块依赖图
- `nexus_utils/agent_factory.py` — 检查其 import 语句
- `nexus_utils/workflow/engine.py` — 检查其 import 语句
- `api/v2/main.py` — 检查其 import 语句
- `worker/main.py` — 检查其 import 语句

**验证方法**:
1. 从依赖图中提取所有标注的依赖关系（如 API→AF、ABW→AF、AF→PM 等）
2. 检查 `agent_factory.py` 的 import 语句，确认其依赖 `prompts_manager`、`config_loader`、`mcp_manager`
3. 检查 `api/v2/main.py` 的 import 语句，确认其依赖的路由和服务模块
4. 检查 `worker/main.py` 的 import 语句，确认其依赖 `api.v2.database`（SQS 客户端）
5. 特别检查以下可能遗漏的依赖：
   - Agent Factory → MCP Manager（MCP 工具加载）
   - Worker → API Database（共享 SQS 客户端）
   - Multimodal Processing → S3（AWS SDK）

**预期结果**:
- 依赖图应标注 Agent Factory 对 Prompt Manager 和 Config Loader 的依赖
- 依赖图应标注 Worker 对 API Database 模块的依赖（共享 `sqs_client`）
- 可能遗漏: Agent Factory 对 MCP Manager 的可选依赖
- 可能遗漏: Multimodal Processing 对 Bedrock（AI 模型服务）的依赖
- 可能遗漏: `safe_agent_factory` 对 `agent_factory` 的依赖

**关联文档**: `docs/update_content/architecture/module-dependencies.md`, `docs/update_content/architecture/system-architecture.md`

**状态**: ⏳ 待验证

---

## 7. 验证问题索引

### 7.1 按维度分类

| 维度 | 问题编号 | 问题数量 |
|------|---------|---------|
| 架构一致性 | Q-A01 ~ Q-A05 | 5 |
| 功能完整性 | Q-F01 ~ Q-F05 | 5 |
| 接口一致性 | Q-I01 ~ Q-I05 | 5 |
| 代码质量 | Q-Q01 ~ Q-Q05 | 5 |
| 文档准确性 | Q-D01 ~ Q-D05 | 5 |
| **合计** | | **25** |

### 7.2 按模块覆盖

| 模块 | 涉及问题 |
|------|---------|
| M01 Agent Factory | Q-A01, Q-F01, Q-I04, Q-I05, Q-D04, Q-D05 |
| M02 Prompt Management | Q-A01, Q-I01, Q-D04 |
| M03 MCP Integration | Q-A04, Q-F04, Q-I03, Q-D04 |
| M04 Multimodal Processing | Q-F02, Q-Q02 |
| M05 Agent Build Workflow | Q-F03 |
| M06 API System | Q-A02, Q-A05, Q-Q03, Q-D02, Q-D03 |
| M07 Worker System | Q-A02, Q-F05, Q-Q01 |
| M08 Configuration Management | Q-A01, Q-I02, Q-Q04, Q-D01 |
| M09 Tool System | Q-A03, Q-I04, Q-Q05 |
| M10 Infrastructure | Q-A02 |

### 7.3 按严重性分级

| 优先级 | 问题编号 | 说明 |
|--------|---------|------|
| **P0 - 关键** | Q-A01, Q-F01, Q-A04, Q-D03 | 核心架构和功能验证 |
| **P1 - 重要** | Q-A02, Q-A03, Q-F02, Q-F03, Q-I01, Q-I03, Q-Q01, Q-D01, Q-D04 | 重要功能和接口验证 |
| **P2 - 一般** | Q-A05, Q-F04, Q-F05, Q-I02, Q-I04, Q-I05, Q-Q02, Q-Q03, Q-Q04, Q-Q05, Q-D02, Q-D05 | 补充验证和质量检查 |

## 8. 验证执行指南

### 8.1 验证顺序建议

建议按以下顺序执行验证：

1. **第一轮: P0 关键问题** (4个)
   - Q-A01 → Q-F01 → Q-A04 → Q-D03
   - 预计耗时: 1-2小时

2. **第二轮: P1 重要问题** (9个)
   - Q-A02 → Q-A03 → Q-F02 → Q-F03 → Q-I01 → Q-I03 → Q-Q01 → Q-D01 → Q-D04
   - 预计耗时: 2-3小时

3. **第三轮: P2 一般问题** (12个)
   - 按编号顺序执行
   - 预计耗时: 2-3小时

### 8.2 验证工具

- **代码检查**: 直接阅读源代码文件
- **Import 分析**: 使用 `grep -r "from\|import"` 检查导入关系
- **函数签名**: 使用 `ast` 模块或 IDE 检查函数签名
- **配置验证**: 直接读取 YAML 配置文件
- **API 端点**: 检查 FastAPI 路由装饰器

### 8.3 结果记录规范

每个问题验证完成后，更新以下字段：
- **状态**: 更新为 ✅ 通过 / ❌ 失败 / ⚠️ 部分通过
- **实际结果**: 记录实际观察到的结果
- **差异说明**: 如果与预期不一致，记录具体差异
- **修正建议**: 如果发现问题，提出修正方案

## 9. 验证统计

| 指标 | 数值 |
|------|------|
| **总问题数** | 25 |
| **已验证** | 0 |
| **通过** | 0 |
| **失败** | 0 |
| **部分通过** | 0 |
| **待验证** | 25 |
| **覆盖模块数** | 10/10 |
| **覆盖文档数** | 15+ |

---

**文档状态**: 已完成  
**创建日期**: 2026-02-05  
**最后更新**: 2026-02-06  
**下一步**: 按优先级顺序执行验证，更新各问题状态
