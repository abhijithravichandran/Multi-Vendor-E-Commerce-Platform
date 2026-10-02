# E-commerce Backend (Modular Monolith)

## Full-Text Search (FTS) Strategy
For Phase 1, the public catalog search uses JPA Criteria API with standard \LIKE\ conditions. In a production PostgreSQL environment, this can be heavily optimized by adding a GIN index on a \	svector\ column (or using the \pg_trgm\ extension).

### Why this is enough for Phase 1:
1. **Compatibility:** Standard \LIKE\ queries work seamlessly across both H2 (used for in-memory integration tests) and PostgreSQL. Adding native \@@ to_tsquery\ logic would break tests or require complex test-specific repository mocks.
2. **Performance at Phase 1 Scale:** With a moderate number of products during initial launch, \LIKE\ queries with appropriate indexing are performant enough.
3. **Future Extension:** When data scales up, the migration to native Postgres FTS (\	svector\ + GIN) or a dedicated search engine (like Elasticsearch or Typesense) can be cleanly integrated via a \ProductSearchRepository\ interface without changing the core business logic.
