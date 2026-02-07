# Nexus-AI 架构图集

**创建日期**: 2026-02-06  
**最后更新**: 2026-02-06  
**文档版本**: 1.0

## 概述

本目录包含Nexus-AI系统的所有架构图，使用Mermaid格式绘制。这些图表从不同角度展示系统的架构设计，帮助理解系统的整体结构和运作机制。

## 图表列表

### 1. 系统总览图
**文件**: [01-system-overview.md](./01-system-overview.md)  
**用途**: 展示系统的整体架构，包括表示层、应用层、服务层和基础设施层  
**关键内容**:
- 四层架构设计
- 主要组件及其关系
- 数据流向

### 2. 模块依赖图
**文件**: [02-module-dependencies.md](./02-module-dependencies.md)  
**用途**: 展示10个核心模块之间的依赖关系  
**关键内容**:
- 模块依赖关系
- 依赖层次（深度0-4）
- 模块分层

### 3. 数据流图
**文件**: [03-data-flow.md](./03-data-flow.md)  
**用途**: 展示系统中数据的流转过程  
**关键内容**:
- Agent创建数据流
- 多模态处理数据流
- 工作流执行数据流

### 4. Agent创建流程图
**文件**: [04-agent-creation-flow.md](./04-agent-creation-flow.md)  
**用途**: 展示从YAML模板创建Agent的完整流程  
**关键内容**:
- Agent创建步骤
- Agent工厂核心逻辑
- 模型选择策略

### 5. 工作流编排图
**文件**: [05-workflow-orchestration.md](./05-workflow-orchestration.md)  
**用途**: 展示7阶段Agent构建工作流的编排逻辑  
**关键内容**:
- 7阶段工作流
- 工作流状态机
- 阶段执行流程
- Multi-Agent协作模式

### 6. API架构图
**文件**: [06-api-architecture.md](./06-api-architecture.md)  
**用途**: 展示REST API的架构设计  
**关键内容**:
- API分层架构
- API端点结构
- 请求处理流程
- 错误处理流程

### 7. 多模态处理流程图
**文件**: [07-multimodal-processing.md](./07-multimodal-processing.md)  
**用途**: 展示多模态内容处理的完整流程  
**关键内容**:
- 多模态处理架构
- 文件处理流程
- 图像处理流程
- 文档处理流程
- 支持的文件类型

### 8. MCP集成图
**文件**: [08-mcp-integration.md](./08-mcp-integration.md)  
**用途**: 展示MCP (Model Context Protocol) 集成架构  
**关键内容**:
- MCP集成架构
- MCP工具发现流程
- MCP工具调用流程
- MCP服务器配置
- 工具注册流程

### 9. 部署架构图
**文件**: [09-deployment-architecture.md](./09-deployment-architecture.md)  
**用途**: 展示AWS云部署架构  
**关键内容**:
- AWS云部署拓扑
- 容器化部署架构
- 网络架构
- 高可用性架构
- CI/CD部署流程

### 10. 技术栈图
**文件**: [10-technology-stack.md](./10-technology-stack.md)  
**用途**: 展示系统使用的技术栈  
**关键内容**:
- 技术栈总览
- 开发技术栈
- 基础设施技术栈
- 部署技术栈
- 开发工具栈

## 使用说明

### 查看图表

所有图表使用Mermaid格式编写，可以通过以下方式查看：

1. **GitHub**: 直接在GitHub上查看Markdown文件，图表会自动渲染
2. **VS Code**: 安装Mermaid插件后可以预览
3. **在线工具**: 复制Mermaid代码到 [Mermaid Live Editor](https://mermaid.live/) 查看
4. **文档网站**: 在支持Mermaid的文档网站中查看

### 编辑图表

1. 使用任何文本编辑器打开`.md`文件
2. 修改Mermaid代码块中的内容
3. 保存文件
4. 使用上述方式预览修改结果

### Mermaid语法参考

- **流程图**: `graph TB` 或 `flowchart TD`
- **时序图**: `sequenceDiagram`
- **状态图**: `stateDiagram-v2`
- **类图**: `classDiagram`
- **ER图**: `erDiagram`

详细语法请参考: [Mermaid官方文档](https://mermaid.js.org/)

## 图表更新规范

### 更新频率
- 架构变更时必须更新相关图表
- 每个版本发布前检查图表准确性
- 定期审查图表与实际系统的一致性

### 更新流程
1. 识别需要更新的图表
2. 修改Mermaid代码
3. 验证图表渲染正确
4. 更新图表说明和日期
5. 提交代码审查

### 命名规范
- 文件名: `序号-图表名称.md`
- 序号: 两位数字，如`01`, `02`
- 名称: 使用连字符分隔的小写英文

## 相关文档

- [系统架构设计](../system-architecture.md)
- [模块依赖关系](../module-dependencies.md)
- [数据流设计](../data-flow.md)
- [部署架构](../deployment-architecture.md)
- [架构总览](../../ARCHITECTURE_OVERVIEW.md)

## 维护信息

**维护者**: Nexus-AI团队  
**联系方式**: 通过GitHub Issues反馈问题  
**更新周期**: 随架构变更实时更新

---

**文档状态**: 已完成  
**图表数量**: 10个  
**最后审核**: 2026-02-06
