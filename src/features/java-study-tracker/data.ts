import type { JavaWeek } from './types'

export const seedJavaWeeks: JavaWeek[] = [
  {
    id: 'w1', week: 1, title: 'Java Fundamentals', status: 'not-started', notes: '',
    description: 'Solidify core language mechanics: memory model, types, and core APIs',
    sections: [
      {
        name: 'Core Language',
        tasks: [
          { id: 'w1-s1-t1', title: 'Review Java memory model: stack vs heap, garbage collection basics', tag: 'concept', done: false },
          { id: 'w1-s1-t2', title: 'Deep-dive into primitives vs objects, autoboxing pitfalls', tag: 'concept', done: false },
          { id: 'w1-s1-t3', title: 'Practice String interning, StringBuilder vs StringBuffer', tag: 'code', done: false },
          { id: 'w1-s1-t4', title: 'Study equals() vs == and hashCode contract', tag: 'concept', done: false },
          { id: 'w1-s1-t5', title: 'Code exercises: custom equals/hashCode for a POJO', tag: 'code', done: false },
        ],
      },
      {
        name: 'Collections & Generics',
        tasks: [
          { id: 'w1-s2-t1', title: 'Review ArrayList, LinkedList, HashMap, TreeMap, LinkedHashMap internals', tag: 'concept', done: false },
          { id: 'w1-s2-t2', title: 'Study ConcurrentHashMap vs synchronized HashMap', tag: 'concept', done: false },
          { id: 'w1-s2-t3', title: 'Implement a generic pair class with bounded wildcards', tag: 'code', done: false },
          { id: 'w1-s2-t4', title: 'Solve 5 LeetCode problems using HashMaps and Sets', tag: 'code', done: false },
        ],
      },
      {
        name: 'Exceptions & I/O',
        tasks: [
          { id: 'w1-s3-t1', title: 'Review checked vs unchecked exceptions, exception hierarchy', tag: 'concept', done: false },
          { id: 'w1-s3-t2', title: 'Study try-with-resources and AutoCloseable', tag: 'concept', done: false },
          { id: 'w1-s3-t3', title: 'Practice NIO.2: Files, Paths, WatchService', tag: 'code', done: false },
        ],
      },
    ],
  },
  {
    id: 'w2', week: 2, title: 'OOP & Design Patterns', status: 'not-started', notes: '',
    description: 'Master object-oriented principles and the most common GoF patterns',
    sections: [
      {
        name: 'OOP Principles',
        tasks: [
          { id: 'w2-s1-t1', title: 'Review SOLID principles with concrete Java examples', tag: 'concept', done: false },
          { id: 'w2-s1-t2', title: 'Study composition vs inheritance trade-offs', tag: 'concept', done: false },
          { id: 'w2-s1-t3', title: 'Refactor a sample class hierarchy to prefer composition', tag: 'code', done: false },
          { id: 'w2-s1-t4', title: 'Implement interfaces with default and static methods (Java 8+)', tag: 'code', done: false },
        ],
      },
      {
        name: 'Creational Patterns',
        tasks: [
          { id: 'w2-s2-t1', title: 'Implement thread-safe Singleton (double-checked locking + enum)', tag: 'code', done: false },
          { id: 'w2-s2-t2', title: 'Build a Builder pattern for a complex request object', tag: 'code', done: false },
          { id: 'w2-s2-t3', title: 'Code a Factory Method and Abstract Factory example', tag: 'code', done: false },
        ],
      },
      {
        name: 'Structural & Behavioral Patterns',
        tasks: [
          { id: 'w2-s3-t1', title: 'Implement Decorator pattern for a logging wrapper', tag: 'code', done: false },
          { id: 'w2-s3-t2', title: 'Study Proxy pattern — JDK dynamic proxy vs CGLIB', tag: 'concept', done: false },
          { id: 'w2-s3-t3', title: 'Build an Observer pattern for an event bus', tag: 'code', done: false },
          { id: 'w2-s3-t4', title: 'Study Strategy and Template Method with Spring use-cases', tag: 'concept', done: false },
          { id: 'w2-s3-t5', title: 'Review patterns used in Spring (Template, Proxy, Factory)', tag: 'interview', done: false },
        ],
      },
    ],
  },
  {
    id: 'w3', week: 3, title: 'Java Concurrency', status: 'not-started', notes: '',
    description: 'Threads, locks, executors, and concurrency utilities at depth',
    sections: [
      {
        name: 'Thread Basics',
        tasks: [
          { id: 'w3-s1-t1', title: 'Review thread lifecycle, daemon threads, thread groups', tag: 'concept', done: false },
          { id: 'w3-s1-t2', title: 'Study volatile keyword and happens-before guarantees', tag: 'concept', done: false },
          { id: 'w3-s1-t3', title: 'Implement producer-consumer with wait/notify', tag: 'code', done: false },
          { id: 'w3-s1-t4', title: 'Understand synchronized blocks vs methods', tag: 'concept', done: false },
        ],
      },
      {
        name: 'java.util.concurrent',
        tasks: [
          { id: 'w3-s2-t1', title: 'Study ReentrantLock, ReadWriteLock, StampedLock', tag: 'concept', done: false },
          { id: 'w3-s2-t2', title: 'Practice with ExecutorService, ScheduledExecutorService', tag: 'code', done: false },
          { id: 'w3-s2-t3', title: 'Implement a parallel task pipeline with CompletableFuture', tag: 'code', done: false },
          { id: 'w3-s2-t4', title: 'Code a rate limiter using Semaphore', tag: 'code', done: false },
          { id: 'w3-s2-t5', title: 'Review CountDownLatch, CyclicBarrier, Phaser use-cases', tag: 'concept', done: false },
        ],
      },
      {
        name: 'Common Pitfalls',
        tasks: [
          { id: 'w3-s3-t1', title: 'Study deadlock, livelock, starvation — code a deadlock example', tag: 'concept', done: false },
          { id: 'w3-s3-t2', title: 'Review ThreadLocal and memory leak risks', tag: 'concept', done: false },
          { id: 'w3-s3-t3', title: 'Solve 3 concurrency interview questions (bank transfer, etc.)', tag: 'interview', done: false },
        ],
      },
    ],
  },
  {
    id: 'w4', week: 4, title: 'Spring Boot Core', status: 'not-started', notes: '',
    description: 'IoC, AOP, auto-configuration, and production-ready REST services',
    sections: [
      {
        name: 'Spring IoC & DI',
        tasks: [
          { id: 'w4-s1-t1', title: 'Review ApplicationContext, BeanFactory lifecycle', tag: 'concept', done: false },
          { id: 'w4-s1-t2', title: 'Study bean scopes: singleton, prototype, request, session', tag: 'concept', done: false },
          { id: 'w4-s1-t3', title: 'Implement @Configuration class with @Bean and @Conditional', tag: 'code', done: false },
          { id: 'w4-s1-t4', title: 'Understand @Autowired resolution: by-type, @Qualifier, @Primary', tag: 'concept', done: false },
        ],
      },
      {
        name: 'Spring AOP',
        tasks: [
          { id: 'w4-s2-t1', title: 'Study JoinPoint, Pointcut, Advice types (@Before, @Around, @After)', tag: 'concept', done: false },
          { id: 'w4-s2-t2', title: 'Build a custom @Around advice for method execution timing', tag: 'code', done: false },
          { id: 'w4-s2-t3', title: 'Implement a retry aspect using @Around and exception handling', tag: 'code', done: false },
        ],
      },
      {
        name: 'Spring Boot & REST',
        tasks: [
          { id: 'w4-s3-t1', title: 'Build a REST API: CRUD endpoints with validation and error handling', tag: 'project', done: false },
          { id: 'w4-s3-t2', title: 'Configure custom auto-configuration with spring.factories', tag: 'code', done: false },
          { id: 'w4-s3-t3', title: 'Add Actuator endpoints with custom health indicators', tag: 'code', done: false },
          { id: 'w4-s3-t4', title: 'Write integration tests with @SpringBootTest and MockMvc', tag: 'code', done: false },
        ],
      },
    ],
  },
  {
    id: 'w5', week: 5, title: 'Spring Security', status: 'not-started', notes: '',
    description: 'Authentication, authorization, JWT, and OAuth2 integration',
    sections: [
      {
        name: 'Security Fundamentals',
        tasks: [
          { id: 'w5-s1-t1', title: 'Review SecurityFilterChain, FilterSecurityInterceptor internals', tag: 'concept', done: false },
          { id: 'w5-s1-t2', title: 'Understand UserDetailsService, PasswordEncoder, AuthenticationManager', tag: 'concept', done: false },
          { id: 'w5-s1-t3', title: 'Configure form login and HTTP basic auth', tag: 'code', done: false },
        ],
      },
      {
        name: 'JWT & Stateless Security',
        tasks: [
          { id: 'w5-s2-t1', title: 'Implement JWT generation and validation with jjwt library', tag: 'code', done: false },
          { id: 'w5-s2-t2', title: 'Build a JwtAuthenticationFilter extending OncePerRequestFilter', tag: 'code', done: false },
          { id: 'w5-s2-t3', title: 'Secure endpoints with @PreAuthorize and method-level security', tag: 'code', done: false },
          { id: 'w5-s2-t4', title: 'Add refresh token flow with Redis token blacklist', tag: 'project', done: false },
        ],
      },
      {
        name: 'OAuth2 & Best Practices',
        tasks: [
          { id: 'w5-s3-t1', title: 'Configure OAuth2 login with Google/GitHub provider', tag: 'code', done: false },
          { id: 'w5-s3-t2', title: 'Study CSRF protection, CORS configuration in Spring Security', tag: 'concept', done: false },
          { id: 'w5-s3-t3', title: 'Review common security vulnerabilities: OWASP Top 10 for APIs', tag: 'interview', done: false },
        ],
      },
    ],
  },
  {
    id: 'w6', week: 6, title: 'JPA, Hibernate & Caching', status: 'not-started', notes: '',
    description: 'Database persistence, N+1 avoidance, transactions, and cache strategies',
    sections: [
      {
        name: 'JPA & Hibernate Internals',
        tasks: [
          { id: 'w6-s1-t1', title: 'Review entity lifecycle: transient, managed, detached, removed', tag: 'concept', done: false },
          { id: 'w6-s1-t2', title: 'Study fetch strategies: EAGER vs LAZY, FetchType pitfalls', tag: 'concept', done: false },
          { id: 'w6-s1-t3', title: 'Implement bidirectional @OneToMany with cascade and orphanRemoval', tag: 'code', done: false },
          { id: 'w6-s1-t4', title: 'Use JPQL, Criteria API, and @NamedQuery', tag: 'code', done: false },
        ],
      },
      {
        name: 'Transactions & N+1',
        tasks: [
          { id: 'w6-s2-t1', title: 'Study @Transactional propagation (REQUIRED, REQUIRES_NEW) and isolation', tag: 'concept', done: false },
          { id: 'w6-s2-t2', title: 'Identify and fix N+1 queries using JOIN FETCH or @EntityGraph', tag: 'code', done: false },
          { id: 'w6-s2-t3', title: 'Use native queries for bulk updates / batch inserts', tag: 'code', done: false },
        ],
      },
      {
        name: 'Caching',
        tasks: [
          { id: 'w6-s3-t1', title: 'Configure Spring Cache with @Cacheable, @CachePut, @CacheEvict', tag: 'code', done: false },
          { id: 'w6-s3-t2', title: 'Integrate Redis as distributed cache (Lettuce / Spring Data Redis)', tag: 'project', done: false },
          { id: 'w6-s3-t3', title: 'Study Hibernate second-level cache with EhCache or Redis', tag: 'concept', done: false },
          { id: 'w6-s3-t4', title: 'Implement cache-aside pattern for product catalog lookup', tag: 'code', done: false },
        ],
      },
    ],
  },
  {
    id: 'w7', week: 7, title: 'Kafka & Messaging', status: 'not-started', notes: '',
    description: 'Event-driven architecture, Kafka internals, and reliable messaging patterns',
    sections: [
      {
        name: 'Kafka Fundamentals',
        tasks: [
          { id: 'w7-s1-t1', title: 'Study Kafka architecture: brokers, topics, partitions, offsets', tag: 'concept', done: false },
          { id: 'w7-s1-t2', title: 'Understand consumer groups, partition assignment, rebalancing', tag: 'concept', done: false },
          { id: 'w7-s1-t3', title: 'Configure producer: acks, retries, idempotence, compression', tag: 'concept', done: false },
          { id: 'w7-s1-t4', title: 'Configure consumer: auto-offset-reset, commit strategies', tag: 'concept', done: false },
        ],
      },
      {
        name: 'Spring Kafka',
        tasks: [
          { id: 'w7-s2-t1', title: 'Build producer and consumer with Spring Kafka @KafkaListener', tag: 'code', done: false },
          { id: 'w7-s2-t2', title: 'Implement dead letter topic (DLT) and retry logic', tag: 'code', done: false },
          { id: 'w7-s2-t3', title: 'Write Kafka Streams stateful aggregation for order events', tag: 'project', done: false },
        ],
      },
      {
        name: 'Messaging Patterns',
        tasks: [
          { id: 'w7-s3-t1', title: 'Implement Outbox Pattern to guarantee DB + Kafka consistency', tag: 'code', done: false },
          { id: 'w7-s3-t2', title: 'Study exactly-once semantics and transactional producers', tag: 'concept', done: false },
          { id: 'w7-s3-t3', title: 'Compare Kafka vs RabbitMQ vs SQS for interview scenarios', tag: 'interview', done: false },
        ],
      },
    ],
  },
  {
    id: 'w8', week: 8, title: 'Microservices Architecture', status: 'not-started', notes: '',
    description: 'Service design, resilience patterns, API gateway, and distributed tracing',
    sections: [
      {
        name: 'Service Design',
        tasks: [
          { id: 'w8-s1-t1', title: 'Review bounded contexts, DDD aggregates, and service boundaries', tag: 'concept', done: false },
          { id: 'w8-s1-t2', title: 'Study synchronous (REST/gRPC) vs async (Kafka) communication trade-offs', tag: 'concept', done: false },
          { id: 'w8-s1-t3', title: 'Build two services communicating via REST and via Kafka', tag: 'project', done: false },
        ],
      },
      {
        name: 'Resilience',
        tasks: [
          { id: 'w8-s2-t1', title: 'Implement circuit breaker with Resilience4j + Spring Boot', tag: 'code', done: false },
          { id: 'w8-s2-t2', title: 'Add retry, rate limiter, bulkhead with Resilience4j annotations', tag: 'code', done: false },
          { id: 'w8-s2-t3', title: 'Configure timeouts and fallback methods', tag: 'code', done: false },
        ],
      },
      {
        name: 'Observability & Gateway',
        tasks: [
          { id: 'w8-s3-t1', title: 'Add distributed tracing with Micrometer + Zipkin/Jaeger', tag: 'cloud', done: false },
          { id: 'w8-s3-t2', title: 'Configure Spring Cloud Gateway: routing, filters, rate limiting', tag: 'code', done: false },
          { id: 'w8-s3-t3', title: 'Implement centralized config with Spring Cloud Config Server', tag: 'code', done: false },
          { id: 'w8-s3-t4', title: 'Study saga pattern (choreography vs orchestration)', tag: 'interview', done: false },
        ],
      },
    ],
  },
  {
    id: 'w9', week: 9, title: 'Docker & Kubernetes', status: 'not-started', notes: '',
    description: 'Containerize services, deploy to K8s, configure health checks and scaling',
    sections: [
      {
        name: 'Docker',
        tasks: [
          { id: 'w9-s1-t1', title: 'Write multi-stage Dockerfile for a Spring Boot app', tag: 'cloud', done: false },
          { id: 'w9-s1-t2', title: 'Optimize image size with layered JARs and Jib plugin', tag: 'cloud', done: false },
          { id: 'w9-s1-t3', title: 'Configure docker-compose for app + Postgres + Redis + Kafka', tag: 'project', done: false },
          { id: 'w9-s1-t4', title: 'Understand bridge vs host vs overlay networking', tag: 'concept', done: false },
        ],
      },
      {
        name: 'Kubernetes',
        tasks: [
          { id: 'w9-s2-t1', title: 'Write Deployment, Service, ConfigMap, and Secret manifests', tag: 'cloud', done: false },
          { id: 'w9-s2-t2', title: 'Configure liveness and readiness probes for Spring Boot', tag: 'cloud', done: false },
          { id: 'w9-s2-t3', title: 'Set up HorizontalPodAutoscaler based on CPU metrics', tag: 'cloud', done: false },
          { id: 'w9-s2-t4', title: 'Deploy microservices to local Minikube / Kind cluster', tag: 'project', done: false },
        ],
      },
      {
        name: 'Helm & GitOps',
        tasks: [
          { id: 'w9-s3-t1', title: 'Package app with Helm chart (values.yaml, templates)', tag: 'cloud', done: false },
          { id: 'w9-s3-t2', title: 'Study GitOps flow with ArgoCD or Flux', tag: 'concept', done: false },
          { id: 'w9-s3-t3', title: 'Review K8s resource requests/limits and QoS classes', tag: 'concept', done: false },
        ],
      },
    ],
  },
  {
    id: 'w10', week: 10, title: 'Cloud Deployment & Interview Prep', status: 'not-started', notes: '',
    description: 'Deploy to AWS/GCP, polish the project, and run mock interviews',
    sections: [
      {
        name: 'Cloud Deployment',
        tasks: [
          { id: 'w10-s1-t1', title: 'Deploy app to AWS ECS or GCP Cloud Run with CI/CD pipeline', tag: 'cloud', done: false },
          { id: 'w10-s1-t2', title: 'Configure RDS (Postgres) and ElastiCache (Redis) on AWS', tag: 'cloud', done: false },
          { id: 'w10-s1-t3', title: 'Set up CloudWatch / Cloud Monitoring alerts and dashboards', tag: 'cloud', done: false },
          { id: 'w10-s1-t4', title: 'Implement blue-green or canary deployment strategy', tag: 'cloud', done: false },
        ],
      },
      {
        name: 'Project Polish',
        tasks: [
          { id: 'w10-s2-t1', title: 'Write comprehensive README with architecture diagram', tag: 'project', done: false },
          { id: 'w10-s2-t2', title: 'Add OpenAPI/Swagger documentation to all REST endpoints', tag: 'project', done: false },
          { id: 'w10-s2-t3', title: 'Ensure >80% test coverage (unit + integration + contract tests)', tag: 'project', done: false },
          { id: 'w10-s2-t4', title: 'Profile and optimize top 3 slow SQL queries', tag: 'code', done: false },
        ],
      },
      {
        name: 'Interview Preparation',
        tasks: [
          { id: 'w10-s3-t1', title: 'Do 2 full mock interviews (system design + coding)', tag: 'interview', done: false },
          { id: 'w10-s3-t2', title: 'Review your top 20 Java/Spring behavioral questions and answers', tag: 'interview', done: false },
          { id: 'w10-s3-t3', title: 'Prepare STAR stories for 5 complex technical challenges you solved', tag: 'interview', done: false },
          { id: 'w10-s3-t4', title: 'Practice whiteboard system design: design Twitter timeline', tag: 'interview', done: false },
          { id: 'w10-s3-t5', title: 'Solve 10 medium LeetCode problems under timed conditions', tag: 'code', done: false },
          { id: 'w10-s3-t6', title: 'Schedule and confirm final interview slots', tag: 'interview', done: false },
        ],
      },
    ],
  },
]
