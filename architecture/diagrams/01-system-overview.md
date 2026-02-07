# 系统总览图

**图表名称**: 系统总览图  
**创建日期**: 2026-02-06  
**用途**: 展示Nexus-AI系统的整体架构和主要组件

## 系统总览

```mermaid
graph TB
    subgraph "表示层 Presentation Layer"
        CLI[CLI工具]
        WebUI[Web界面]
        API[REST API]
    end
    
    subgraph "应用层 Application Layer"
        AgentFactory[Agent Factory]
        WorkflowEngine[Workflow Engine]
        MultiAgent[Multi-Agent Orchestrator]
    end
    
    subgraph "服务层 Service Layer"
        PromptMgr[Prompt Manager]
        MCPMgr[MCP Manager]
        MultimodalProc[Multimodal Processor]
        ConfigMgr[Config Manager]
    end
    
    subgraph "基础设施层 Infrastructure Layer"
        DynamoDB[(DynamoDB)]
        SQS[SQS Queue]
        S3[(S3 Storage)]
        Bedrock[AWS Bedrock]
    end
    
    CLI --> API
    WebUI --> API
    API --> AgentFactory
    API --> WorkflowEngine
    AgentFactory --> PromptMgr
    AgentFactory --> MCPMgr
    WorkflowEngine --> MultiAgent
    MultiAgent --> MultimodalProc
    PromptMgr --> ConfigMgr
    MCPMgr --> ConfigMgr
    API --> DynamoDB
    WorkflowEngine --> SQS
    MultimodalProc --> S3
    AgentFactory --> Bedrock
    
    style CLI fill:#e1f5ff
    style WebUI fill:#e1f5ff
    style API fill:#e1f5ff
    style AgentFactory fill:#fff4e1
    style WorkflowEngine fill:#fff4e1
    style MultiAgent fill:#fff4e1
    style PromptMgr fill:#ffe1e1
    style MCPMgr fill:#ffe1e1
    style MultimodalProc fill:#ffe1e1
    style ConfigMgr fill:#ffe1e1
    style DynamoDB fill:#e1ffe1
    style SQS fill:#e1ffe1
    style S3 fill:#e1ffe1
    style Bedrock fill:#e1ffe1
```

## 说明

- **表示层**: 用户交互界面，包括CLI、Web界面和REST API
- **应用层**: 核心业务逻辑，包括Agent创建、工作流编排和多Agent协作
- **服务层**: 支撑服务，包括提示词管理、MCP集成、多模态处理和配置管理
- **基础设施层**: AWS托管服务，包括数据库、队列、存储和AI模型服务
