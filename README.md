# Nexus-AI 技术文档

**创建日期**: 2026-02-05  
**最后更新**: 2026-02-07  
**文档版本**: 2.0

## 文档导航

本目录包含Nexus-AI项目的完整技术文档,包括系统架构、模块详情、业务流程、API参考和代码分析。

### 快速导航

#### 📋 架构文档
- [系统架构总览](ARCHITECTURE_OVERVIEW.md) - 系统整体架构概述
- [系统架构设计](architecture/system-architecture.md) - 详细的系统架构设计
- [模块依赖关系](architecture/module-dependencies.md) - 模块间的依赖关系分析
- [数据流设计](architecture/data-flow.md) - 系统数据流转设计
- [部署架构](architecture/deployment-architecture.md) - 系统部署架构说明

#### 📦 模块文档
- [01 - Agent Factory](modules/01-agent-factory.md) - Agent工厂系统
- [02 - Prompt Management](modules/02-prompt-management.md) - 提示词管理系统
- [03 - MCP Integration](modules/03-mcp-integration.md) - MCP集成系统
- [04 - Multimodal Processing](modules/04-multimodal-processing.md) - 多模态处理系统
- [05 - Agent Build Workflow](modules/05-agent-build-workflow.md) - Agent构建工作流
- [06 - API System](modules/06-api-system.md) - API系统
- [07 - Worker System](modules/07-worker-system.md) - Worker系统
- [08 - Configuration Management](modules/08-configuration-management.md) - 配置管理系统
- [09 - Tool System](modules/09-tool-system.md) - 工具系统
- [10 - Infrastructure](modules/10-infrastructure.md) - 基础设施

#### 🔄 业务流程
- [Agent创建流程](business-flows/agent-creation-process.md) - Agent创建的完整流程
- [工作流执行](business-flows/workflow-execution.md) - 工作流编排和执行
- [内容处理流程](business-flows/content-processing.md) - 多模态内容处理流程
- [部署流程](business-flows/deployment-process.md) - 系统部署流程

#### 🔌 API参考
- [REST API v2](api-reference/rest-api-v2.md) - REST API接口文档
- [内部API](api-reference/internal-apis.md) - 内部API接口文档
- [MCP工具参考](api-reference/mcp-tools-reference.md) - MCP工具接口文档

#### 🔍 代码分析
- [冗余代码分析](code-analysis/redundancy-analysis.md) - 代码冗余问题分析
- [接口冲突分析](code-analysis/interface-conflicts.md) - 接口冲突问题分析
- [废弃代码清单](code-analysis/deprecated-code.md) - 废弃代码识别清单
- [逻辑缺陷分析](code-analysis/logic-gaps.md) - 逻辑缺陷问题分析
- [改进建议](code-analysis/improvement-suggestions.md) - 代码改进建议

#### ✅ 验证文档
- [验证问题集](verification/test-questions.md) - 文档验证问题集
- [交叉检查结果](verification/cross-check-results.md) - 文档交叉检查结果
- [代码示例验证](verification/code-examples-verification.md) - 代码示例可运行性验证
- [一致性报告](verification/consistency-report.md) - 文档一致性报告

#### 📊 HTML报告
- [架构师报告](architect-report.html) - 交互式HTML架构报告

## 文档结构

```
docs/update_content/
├── README.md                         # 本文件 - 文档导航
├── ARCHITECTURE_OVERVIEW.md          # 系统架构总览
├── architecture/                     # 架构设计文档
│   ├── system-architecture.md
│   ├── module-dependencies.md
│   ├── data-flow.md
│   ├── deployment-architecture.md
│   └── diagrams/                    # Mermaid架构图
├── modules/                         # 模块文档
│   ├── 01-agent-factory.md
│   ├── 02-prompt-management.md
│   ├── 03-mcp-integration.md
│   ├── 04-multimodal-processing.md
│   ├── 05-agent-build-workflow.md
│   ├── 06-api-system.md
│   ├── 07-worker-system.md
│   ├── 08-configuration-management.md
│   ├── 09-tool-system.md
│   └── 10-infrastructure.md
├── business-flows/                  # 业务流程文档
│   ├── agent-creation-process.md
│   ├── workflow-execution.md
│   ├── content-processing.md
│   └── deployment-process.md
├── api-reference/                   # API参考文档
│   ├── rest-api-v2.md
│   ├── internal-apis.md
│   └── mcp-tools-reference.md
├── code-analysis/                   # 代码分析结果
│   ├── redundancy-analysis.md
│   ├── interface-conflicts.md
│   ├── deprecated-code.md
│   ├── logic-gaps.md
│   └── improvement-suggestions.md
├── verification/                    # 验证文档
│   ├── test-questions.md
│   ├── cross-check-results.md
│   ├── code-examples-verification.md
│   └── consistency-report.md
└── architect-report.html            # 架构师HTML报告
```

## 使用说明

### 阅读顺序建议

**新用户**:
1. 先阅读 [系统架构总览](ARCHITECTURE_OVERVIEW.md)
2. 然后阅读 [系统架构设计](architecture/system-architecture.md)
3. 根据兴趣选择具体模块文档阅读

**开发者**:
1. 阅读相关模块文档
2. 查看 [API参考](api-reference/) 了解接口
3. 参考 [业务流程](business-flows/) 理解业务逻辑

**架构师**:
1. 阅读所有架构文档
2. 查看 [代码分析](code-analysis/) 了解问题
3. 查看 [架构师报告](architect-report.html) 获取全局视图

### 文档约定

- **代码**: 所有代码使用英文,注释使用中文
- **文档**: 所有文档使用中文编写
- **架构图**: 使用Mermaid语法绘制
- **示例**: 所有代码示例都经过验证可运行

## 文档维护

### 更新频率
- 重大变更: 立即更新
- 常规变更: 每月更新
- 定期审查: 每季度审查

### 贡献指南
1. 发现文档问题请提交Issue
2. 建议改进请提交PR
3. 遵循现有文档格式和风格

## 联系方式

如有问题或建议,请联系项目维护团队。

---

**文档状态**: 已完成  
**最后审核**: 2026-02-07
