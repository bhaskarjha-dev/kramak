# Planner Domain Conventions & Ecosystem Playbooks

> **Module Role:** On-demand technical reference loaded when the Planner evaluates unfamiliar technology stacks, complex runtimes, or monorepo workspaces.
>
> **Design Principle:** Structured strictly as concrete lookup tables, directory layouts, and actionable checklists—never prose.

---

## 1. Master Ecosystem Lookup Table

| Ecosystem / Framework | Build Command | Test Command | Lint / Check Command | Dev / Server Command | Canonical Architecture Pattern |
|---|---|---|---|---|---|
| **React / Next.js (App Router)** | `pnpm build` | `pnpm test` / `vitest` | `pnpm biome check` / `eslint .` | `pnpm dev` | Server Component $\rightarrow$ Client Hook $\rightarrow$ Server Action / API Route |
| **Vue / Nuxt 3** | `pnpm build` | `pnpm vitest` | `pnpm eslint .` | `pnpm dev` | Page $\rightarrow$ Component $\rightarrow$ Composable $\rightarrow$ Pinia Store |
| **Node / TypeScript (Backend)** | `pnpm build` | `pnpm test` | `pnpm biome check` / `tsc --noEmit` | `pnpm dev` | Controller / Route $\rightarrow$ Service Layer $\rightarrow$ Repository / ORM |
| **Python / FastAPI** | `uv sync` | `pytest` | `ruff check . && mypy .` | `fastapi dev` / `uvicorn main:app` | APIRouter $\rightarrow$ Service / Domain Logic $\rightarrow$ Pydantic / SQLAlchemy Model |
| **Python / Django** | `python manage.py check` | `pytest` / `python manage.py test` | `ruff check .` | `python manage.py runserver` | URLConf $\rightarrow$ View / ViewSet $\rightarrow$ Serializer $\rightarrow$ Django ORM Model |
| **Go** | `go build ./...` | `go test -v ./...` | `golangci-lint run` / `go vet ./...` | `go run ./cmd/...` | HTTP Handler $\rightarrow$ Service Interface $\rightarrow$ Repository / SQL Store |
| **Rust** | `cargo build` | `cargo test` | `cargo clippy -- -D warnings` | `cargo run` | Route Handler $\rightarrow$ Domain Trait $\rightarrow$ Impl / Database Adapter |
| **Java / Spring Boot** | `./gradlew build` | `./gradlew test` | `./gradlew check` | `./gradlew bootRun` | `@RestController` $\rightarrow$ `@Service` $\rightarrow$ `@Repository` (Spring Data JPA) |
| **Ruby on Rails** | `bin/rails zeitwerk:check`| `bundle exec rspec` / `bin/rails test`| `bundle exec rubocop` | `bin/rails server` | Controller $\rightarrow$ Service Object / Interactor $\rightarrow$ ActiveRecord Model |
| **Elixir / Phoenix** | `mix compile` | `mix test` | `mix credo --strict` | `mix phx.server` | Router $\rightarrow$ Controller / LiveView $\rightarrow$ Context Module $\rightarrow$ Ecto Schema |
| **.NET / C#** | `dotnet build` | `dotnet test` | `dotnet format --verify-no-changes` | `dotnet run` | Controller / Endpoint $\rightarrow$ Service Interface $\rightarrow$ EF Core DbContext |
| **Swift (Server/Package)** | `swift build` | `swift test` | `swiftlint` | `swift run` | Route Handler $\rightarrow$ Controller $\rightarrow$ Async Repository Service |

---

## 2. Deep-Dive Ecosystem Playbooks

### 2.1 React & Next.js (App Router)

| Category | Concrete Convention / Standard |
|---|---|
| **Directory Layout** | `src/app/` (routes), `src/components/ui/` (primitives), `src/hooks/` (client state), `src/lib/` (utilities & clients), `src/types/` (shared interfaces). |
| **Component Boundaries** | Default to Server Components (`async function Page()`). Add `"use client"` directive **only** when using React hooks (`useState`, `useEffect`, `useContext`) or browser event listeners (`onClick`). |
| **Testing Conventions** | Unit test pure utilities and hooks with Vitest; component tests with React Testing Library; E2E flows with Playwright. **DO NOT** unit test basic HTML/CSS rendering. |
| **Common Agent Pitfalls** | (1) Forgetting `"use client"` on interactive components. (2) Importing server-only modules (e.g. database clients) into client components. (3) Mutating React state directly instead of immutable setter calls. |
| **Lockfile Patterns** | Commit `pnpm-lock.yaml` (or `package-lock.json` / `bun.lock`). When adding dependencies, specify exact versions. |

---

### 2.2 Python (FastAPI & Modern Async)

| Category | Concrete Convention / Standard |
|---|---|
| **Directory Layout** | `src/app/api/v1/` (routers), `src/app/core/` (config & security), `src/app/models/` (SQLAlchemy/SQLModel), `src/app/schemas/` (Pydantic models), `src/app/services/` (business logic). |
| **Async Architecture** | Use `async def` for I/O-bound operations (database queries, HTTP requests). Use standard `def` for CPU-bound computations to avoid blocking the event loop. |
| **Testing Conventions** | Use `pytest` with `pytest-asyncio` (`@pytest.mark.asyncio`). Use `httpx.AsyncClient` with `ASGITransport` for endpoint integration tests. Mock external third-party APIs with `respx` or `pytest-mock`. |
| **Common Agent Pitfalls** | (1) Blocking event loop with sync `requests.get` or `time.sleep` instead of `httpx.AsyncClient` or `asyncio.sleep`. (2) Mixing Pydantic v1 (`@validator`) and v2 (`@field_validator`) syntax. (3) Missing type annotations on FastAPI route arguments leading to query param vs body payload confusion. |
| **Lockfile Patterns** | Commit `uv.lock` or `poetry.lock`. Ensure virtual environment paths (`.venv/`) are excluded in `.gitignore`. |

---

### 2.3 Go (Standard Project Layout)

| Category | Concrete Convention / Standard |
|---|---|
| **Directory Layout** | `cmd/<app>/main.go` (entrypoint), `internal/handler/` (HTTP/gRPC), `internal/service/` (domain logic), `internal/store/` (database layer), `pkg/` (exported reusable packages). |
| **Error Handling & Flow** | Return `(Result, error)` tuples. Wrap errors with context (`fmt.Errorf("reading user: %w", err)`). Never discard errors with `_ = fn()`. |
| **Testing Conventions** | Table-driven tests using `testing.T`. Subtests via `t.Run(tt.name, func(t *testing.T) { ... })`. Test files placed adjacent to source files (`user_test.go`). |
| **Common Agent Pitfalls** | (1) Panicking in library code instead of returning errors. (2) Goroutine leaks caused by unbuffered channels or missing `context.Done()` cancellation checks. (3) Modifying shared slice/map data across concurrent goroutines without `sync.Mutex` or `sync.RWMutex`. |
| **Lockfile Patterns** | Commit `go.mod` and `go.sum`. Run `go mod tidy` after dependency updates. |

---

### 2.4 Rust (Cargo Ecosystem)

| Category | Concrete Convention / Standard |
|---|---|
| **Directory Layout** | `src/main.rs` / `src/lib.rs`, `src/routes/`, `src/models/`, `src/services/`, `src/error.rs`, `tests/` (integration test crates). |
| **Error & Type Patterns** | Implement custom `AppError` enum using `thiserror`. Return `Result<T, AppError>`. Use `?` operator for clean error propagation. |
| **Testing Conventions** | Unit tests in inner modules (`#[cfg(test)] mod tests { ... }`). Integration tests in top-level `tests/` directory testing public crate API. |
| **Common Agent Pitfalls** | (1) Unnecessary `.clone()` calls causing runtime performance regressions. (2) Fighting the borrow checker with circular references instead of indices or `Arc<Mutex<T>>`. (3) Using `.unwrap()` or `.expect()` in production paths. |
| **Lockfile Patterns** | Commit `Cargo.lock` for binary/service applications. Run `cargo clippy --all-targets --all-features` to ensure clean builds. |

---

### 2.5 Java & Spring Boot

| Category | Concrete Convention / Standard |
|---|---|
| **Directory Layout** | `src/main/java/com/example/app/controller/`, `.../service/`, `.../repository/`, `.../model/`, `.../dto/`, `src/test/java/...` |
| **Component Wiring** | Use constructor-based dependency injection with `@RequiredArgsConstructor` (Lombok) or explicit constructor. Avoid field injection (`@Autowired` on private fields). |
| **Testing Conventions** | Unit test services with JUnit 5 and Mockito (`@ExtendWith(MockitoExtension.class)`). Integration test controllers with `@WebMvcTest` or `@SpringBootTest` with `TestRestTemplate` / `WebTestClient`. |
| **Common Agent Pitfalls** | (1) LazyInitializationException in JPA/Hibernate caused by accessing uninitialized collections outside transactional context (`@Transactional`). (2) Exposing JPA entity models directly in REST responses instead of dedicated DTOs. |
| **Lockfile Patterns** | Commit `gradle/wrapper/gradle-wrapper.properties` and `pom.xml` / `build.gradle.kts`. |

---

## 3. Monorepo Orchestration Patterns

When the Planner detects a monorepo workspace (Turborepo, Nx, Cargo Workspace, Go Multi-Module), apply these operational conventions:

### 3.1 Monorepo Toolchain Conventions

| Monorepo System | Root Manifest | Subproject Manifest | Workspace Command Pattern | Scoped Execution Pattern |
|---|---|---|---|---|
| **pnpm Workspaces** | `pnpm-workspace.yaml` | `packages/*/package.json` | `pnpm -r build` | `pnpm --filter <pkg-name> <cmd>` |
| **Turborepo** | `turbo.json` | `apps/*/package.json` | `turbo run build` | `turbo run test --filter=<pkg-name>` |
| **Nx** | `nx.json` | `project.json` | `nx run-many -t build` | `nx test <pkg-name>` |
| **Cargo Workspace** | `Cargo.toml` (`[workspace]`) | `crates/*/Cargo.toml` | `cargo build --workspace` | `cargo test -p <crate-name>` |
| **Go Workspaces** | `go.work` | `modules/*/go.mod` | `go build ./...` | `go test -C ./modules/<mod> ./...` |

### 3.2 Monorepo Work Item Scoping Rules
1. **Isolated Package Scope:** Every Work Item target file path must reside within a single package directory (e.g. `packages/auth/src/index.ts`).
2. **Root Workspace Validation:** Always attach both package-scoped test commands AND root build check commands to the Work Item's `## Verification` section.
3. **Shared Package Build Order:** If Package B depends on Package A, Package A must be built and verified in `WI-101` before Package B is built in `WI-102`.
