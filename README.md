# Frontend

## Project file structure
````
frontend/
    ...                 (workspace-wide config files)
    projects/           (generated applications and libraries)
        client/         --(application)
            ...         --(application-specific config)
            src/        --(source and support files for application)
        restaurateur/   --(application)
            ...         --(application-specific config)
            src/        --source and support files for application)
````
## Development server

In target application folder, run `ng serve [--port port-number]` for a dev server. Navigate to `http://localhost:4200/` or `http://localhost:port-number/`. The app will automatically reload if you change any of the source files.
