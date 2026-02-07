# API架构图

**图表名称**: API架构图  
**创建日期**: 2026-02-06  
**用途**: 展示REST API的架构设计

## API分层架构

```mermaid
graph TB
    subgraph "客户端层"
        WebClient[Web客户端]
        MobileClient[移动客户端]
        CLIClient[CLI客户端]
    end
    
    subgraph "API网关层"
        ALB[负载均衡器]
        Auth[认证中间件]
        RateLimit[限流中间件]
        CORS[CORS中间件]
    end
    
    subgraph "路由层"
        ProjectRouter[项目路由]
        AgentRouter[Agent路由]
        WorkflowRouter[工作流路由]
        MultimodalRouter[多模态路由]
    end
    
    subgraph "服务层"
        ProjectService[项目服务]
        AgentService[Agent服务]
        WorkflowService[工作流服务]
        MultimodalService[多模态服务]
    end
    
    subgraph "数据层"
        DynamoDB[(DynamoDB)]
        S3[(S3)]
        SQS[SQS]
    end
    
    WebClient --> ALB
    MobileClient --> ALB
    CLIClient --> ALB
    
    ALB --> Auth
    Auth --> RateLimit
    RateLimit --> CORS
    
    CORS --> ProjectRouter
    CORS --> AgentRouter
    CORS --> WorkflowRouter
    CORS --> MultimodalRouter
    
    ProjectRouter --> ProjectService
    AgentRouter --> AgentService
    WorkflowRouter --> WorkflowService
    MultimodalRouter --> MultimodalService
    
    ProjectService --> DynamoDB
    AgentService --> DynamoDB
    WorkflowService --> SQS
    MultimodalService --> S3
```

## API端点结构

```mermaid
graph LR
    API[/api/v2] --> Projects[/projects]
    API --> Agents[/agents]
    API --> Workflows[/workflows]
    API --> Multimodal[/multimodal]
    API --> Health[/health]
    
    Projects --> P1[GET /projects]
    Projects --> P2[POST /projects]
    Projects --> P3[GET /projects/:id]
    Projects --> P4[PUT /projects/:id]
    Projects --> P5[DELETE /projects/:id]
    
    Agents --> A1[GET /agents]
    Agents --> A2[POST /agents]
    Agents --> A3[GET /agents/:id]
    Agents --> A4[DELETE /agents/:id]
    
    Workflows --> W1[POST /workflows/execute]
    Workflows --> W2[GET /workflows/:id]
    Workflows --> W3[GET /workflows/:id/status]
    
    Multimodal --> M1[POST /multimodal/parse]
    Multimodal --> M2[GET /multimodal/files/:id]
    
    style API fill:#e1f5ff
    style Projects fill:#fff4e1
    style Agents fill:#ffe1e1
    style Workflows fill:#e1ffe1
    style Multimodal fill:#f4e1ff
```

## 请求处理流程

```mermaid
sequenceDiagram
    participant Client
    participant ALB
    participant Auth
    participant Router
    participant Service
    participant DB
    
    Client->>ALB: HTTP Request
    ALB->>Auth: 转发请求
    Auth->>Auth: 验证Token
    
    alt 认证失败
        Auth-->>Client: 401 Unauthorized
    else 认证成功
        Auth->>Router: 路由请求
        Router->>Service: 调用服务
        Service->>DB: 数据操作
        DB-->>Service: 返回数据
        Service-->>Router: 返回结果
        Router-->>Auth: 返回响应
        Auth-->>ALB: 返回响应
        ALB-->>Client: HTTP Response
    end
```

## 错误处理流程

```mermaid
graph TD
    Request[接收请求] --> Validate{验证请求}
    Validate -->|无效| Error400[400 Bad Request]
    Validate -->|有效| Auth{认证检查}
    
    Auth -->|失败| Error401[401 Unauthorized]
    Auth -->|成功| Process[处理请求]
    
    Process --> Execute{执行操作}
    Execute -->|成功| Success[200 OK]
    Execute -->|资源不存在| Error404[404 Not Found]
    Execute -->|服务器错误| Error500[500 Internal Server Error]
    Execute -->|超时| Error504[504 Gateway Timeout]
    
    Error400 --> Log[记录日志]
    Error401 --> Log
    Error404 --> Log
    Error500 --> Log
    Error504 --> Log
    Success --> Log
    
    Log --> Response[返回响应]
    
    style Request fill:#e1f5ff
    style Success fill:#e1ffe1
    style Error400 fill:#ffe1e1
    style Error401 fill:#ffe1e1
    style Error404 fill:#ffe1e1
    style Error500 fill:#ffe1e1
    style Error504 fill:#ffe1e1
```
