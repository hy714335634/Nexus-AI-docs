---
inclusion: auto
---

# Nexus-AI 项目文档仓库指南

## 仓库定位

本仓库 (Nexus-AI-docs) 是 Nexus-AI 项目的**独立技术文档仓库**，与代码仓库 (Nexus-AI) 分离维护。所有文档使用中文编写，代码示例保持英文。

## 项目简介

Nexus-AI 是一个基于 AWS Bedrock 的企业级 AI Agent 开发平台，采用"Agent Build Agent"方法，让业务人员通过自然语言构建、部署和管理 AI 代理系统。核心能力包括：

- Agent Factory：从 YAML 模板动态创建 Agent
- 9 阶段 Agent 开发流水线（需求分析 → 架构设计 → Agent 设计 → 提示词工程 → 工具开发 → 代码开发 → 开发管理 → 部署 → 运行）
- 多 Agent 编排（Graph / Swarm 模式）
- MCP 协议工具集成
- 多模态内容处理（图像、Excel、Word、PDF）

## 技术栈概要

- 后端：Python 3.13+ / FastAPI / Strands Framework / AWS Bedrock
- 前端：Next.js 14 / React 18 / TypeScript / Tailwind CSS
- 基础设施：DynamoDB / SQS / S3 / Docker / Terraform
- AI 模型：Claude Haiku 4.5 / Claude Sonnet 4.5 / Claude Opus 4.5

## 文档结构

```
Nexus-AI-docs/
├── ARCHITECTURE_OVERVIEW.md      # 系统架构总览（入口文档）
├── DELIVERY_CHECKLIST.md         # 交付检查清单
├── architecture/                 # 架构设计文档 + Mermaid 图集
├── modules/                      # 10 个核心模块文档（M01-M10）
├── business-flows/               # 业务流程文档
├── api-reference/                # REST API / 内部 API / MCP 工具参考
├── code-analysis/                # 代码分析（冗余、冲突、废弃、缺陷、改进）
├── verification/                 # 验证文档（测试问题、交叉检查、一致性）
└── metadata/                     # 模块元数据 YAML
```

## 核心模块索引

| ID  | 模块 | 文档路径 |
|-----|------|----------|
| M01 | Agent Factory System | modules/01-agent-factory.md |
| M02 | Prompt Management | modules/02-prompt-management.md |
| M03 | MCP Integration | modules/03-mcp-integration.md |
| M04 | Multimodal Processing | modules/04-multimodal-processing.md |
| M05 | Agent Build Workflow | modules/05-agent-build-workflow.md |
| M06 | API System | modules/06-api-system.md |
| M07 | Worker System | modules/07-worker-system.md |
| M08 | Configuration Management | modules/08-configuration-management.md |
| M09 | Tool System | modules/09-tool-system.md |
| M10 | Infrastructure | modules/10-infrastructure.md |

## 编写规范

- 所有文档内容使用中文
- 代码示例保持英文，注释使用中文
- 架构图使用 Mermaid 语法
- 文件命名使用 kebab-case（如 `system-architecture.md`）
- 新增文档需同步更新 README.md 导航索引
- 模块文档按 `XX-模块名.md` 格式编号

## 文档维护原则

- 文档应与 Nexus-AI 代码仓库保持同步
- 重大架构变更需立即更新对应文档
- 新增模块需创建对应的模块文档和元数据 YAML
- 修改 API 接口需同步更新 api-reference 目录下的文档
