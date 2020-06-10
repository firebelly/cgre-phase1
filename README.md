# CGRE Phase 1

Grav site for "simple" "one page" CGRE phase 1.

Run `fab deploy:initial=y` for initial deploy to upload files not in repo.

For domain-specific config overrides, add a folder e.g.:

user/cgre-phase1.localhost
└── config
    ├── plugins
    │   ├── akismet.yaml
    │   └── email.yaml
    ├── security.yaml
    └── system.yaml

Add your SMTP info to `email.yaml` and your Akismet key to `akismet.yaml`.
