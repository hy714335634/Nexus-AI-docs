# 模块依赖图

**图表名称**: 模块依赖关系图  
**创建日期**: 2026-02-06  
**用途**: 展示各模块之间的依赖关系

## 模块依赖关系

```mermaid
graph TB
    subgraph "应用层"
        API[M06: API System]
        ABW[M05: Agent Build Workflow]
        AF[M01: Agent Factory]
    end
    
    subgraph "服务层"
        PM[M02: Prompt Manager]
        MM[M03: MCP Manager]
        MP[M04: Multimodal Processor]
        CM[M08: Config Manager]
        TS[M09: Tool System]
    end
    
    subgraph "基础设施层"
        WS[M07: Worker System]
        INF[M10: Infrastructure]
    end
    
    API --> AF
    API --> ABW
    API --> WS
    
    ABW --> AF
    ABW --> TS
    
    AF --> PM
    AF --> MM
    AF --> CM
    
    PM --> CM
    MM --> CM
    MP --> CM
    TS --> MM
    
    WS --> ABW
    
    style API fill:#e1f5ff
    style ABW fill:#e1f5ff
    style AF fill:#e1f5ff
    style PM fill:#fff4e1
    style MM fill:#fff4e1
    style MP fill:#fff4e1
    style CM fill:#fff4e1
    style TS fill:#fff4e1
    style WS fill:#f0f0f0
    style INF fill:#f0f0f0
```

## 依赖层次

### 深度0 (无依赖)
- M08 Config Manager
- M10 Infrastructure

### 深度1 (依赖深度0)
- M02 Prompt Manager → M08
- M03 MCP Manager → M08
- M04 Multimodal Processor → M08

### 深度2 (依赖深度1)
- M01 Agent Factory → M02, M03, M08
- M09 Tool System → M03

### 深度3 (依赖深度2)
- M05 Agent Build Workflow → M01, M09
- M06 API System → M01, M05, M07

### 深度4 (依赖深度3)
- M07 Worker System → M05
