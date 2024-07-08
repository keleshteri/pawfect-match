# PawfectMatch

![Current Version](https://img.shields.io/badge/version-v0.1-blue)


## Overview
PawfectMatch is a web application designed to facilitate the adoption of puppies. It allows users to view, search, and initiate the adoption process for puppies.

## Features
- **View Puppies**: Users can browse a list of available puppies with essential details.
- **Search and Filter**: Users can search for puppies by name and filter them by criteria such as breed, age, and size.
- **Detailed Profiles**: Each puppy has a detailed profile page with additional information about their personality and health.
- **Admin Interface**: Administrators can manage puppy listings, including adding, updating, and removing entries.

## Installation
### Prerequisites
- [pnpm](https://pnpm.io/installation) installed on your system.
### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/keleshteri/pawfect-match.git
    cd pawfect-match
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

3. Run both the server and web application:
    ```sh
    pnpm dev
    ```

### Running the Application
- The backend server will run on port **4000**.
- The frontend application will run on port **4200**.

### API Documentation
- The API documentation can be accessed at [http://localhost:4000/api-docs](http://localhost:4000/api-docs).
Below is a screenshot of the Swagger UI for our Puppies API, providing a detailed view of all available endpoints and their specifications:

![Swagger UI](https://github.com/keleshteri/pawfect-match/blob/main/docs/images/Swagger_UI.png)

## Screenshots

### Home Page
![Home Page](https://github.com/keleshteri/pawfect-match/blob/main/docs/images/homepage.png)

### Puppy Profile
![Puppy Profile](https://github.com/keleshteri/pawfect-match/blob/main/docs/images/puppy_profile.png)



## Project Structure
 ```
└── 📁pawfect-match
    └── .gitignore
    └── 📁.husky
        └── 📁_
            └── .gitignore
            └── applypatch-msg
            └── commit-msg
            └── h
            └── husky.sh
            └── post-applypatch
            └── post-checkout
            └── post-commit
            └── post-merge
            └── post-rewrite
            └── pre-applypatch
            └── pre-auto-gc
            └── pre-commit
            └── pre-push
            └── pre-rebase
            └── prepare-commit-msg
    └── 📁apps
        └── 📁server
            └── .env
            └── .eslintrc.js
            └── .gitignore
            └── .prettierrc
            └── nest-cli.json
            └── package.json
            └── 📁prisma
                └── dev.db
                └── 📁migrations
                    └── 📁20240706070614_init
                        └── migration.sql
                    └── 📁20240706074124_health_record
                        └── migration.sql
                    └── 📁20240706095714_adoption_application
                        └── migration.sql
                    └── 📁20240706101822_remove_is_neutered_is_vaccinated
                        └── migration.sql
                    └── migration_lock.toml
                └── schema.prisma
                └── seed.ts
            └── README.md
            └── 📁src
                └── app.module.ts
                └── main.ts
                └── 📁modules
                    └── 📁adoption-application
                        └── adoption-application.controller.ts
                        └── adoption-application.module.ts
                        └── adoption-application.service.ts
                        └── 📁dtos
                            └── adoption-application-create-user.dto.ts
                            └── adoption-application-create.dto.ts
                    └── 📁breeds
                        └── breeds.controller.ts
                        └── breeds.module.ts
                        └── breeds.service.ts
                    └── 📁common
                        └── all-exceptions.filter.ts
                        └── common.module.ts
                        └── 📁dtos
                            └── index.ts
                            └── pagination-metadata.dto.ts
                            └── pagination.dto.ts
                        ├── interfaces
                    └── 📁prisma
                        └── prisma.module.ts
                        └── prisma.service.spec.ts
                        └── prisma.service.ts
                    └── 📁puppies
                        └── 📁dtos
                            └── create-puppy.dto.ts
                            └── puppy-details.response.ts
                            └── puppy-filter.dto.ts
                            └── puppy-list-pagination.dto.ts
                            └── puppy-list-response.dto.ts
                            └── puppy-search.dto.ts
                            └── update-puppy.dto.ts
                        └── 📁entities
                            └── breed.entity.ts
                            └── puppy.entity.ts
                            └── trait.entity.ts
                        └── puppies.controller.spec.ts
                        └── puppies.controller.ts
                        └── puppies.mapper.service.ts
                        └── puppies.module.ts
                        └── puppies.service.ts
                    └── 📁users
                        └── 📁dtos
                            └── create-user.dto.ts
                        └── users.controller.ts
                        └── users.module.ts
                        └── users.service.ts
            └── 📁test
                └── app.e2e-spec.ts
                └── jest-e2e.json
            └── tsconfig.build.json
            └── tsconfig.json
        └── 📁web
            └── 📁.angular
                └── 📁cache
                    └── 📁18.0.7
                        └── 📁vite
                            └── 📁deps
                                └── @angular_common.js
                                └── @angular_common.js.map
                                └── @angular_common_http.js
                                └── @angular_common_http.js.map
                                └── @angular_core.js
                                └── @angular_core.js.map
                                └── @angular_forms.js
                                └── @angular_forms.js.map
                                └── @angular_platform-browser.js
                                └── @angular_platform-browser.js.map
                                └── @angular_router.js
                                └── @angular_router.js.map
                                └── chunk-N4DUWSRY.js
                                └── chunk-N4DUWSRY.js.map
                                └── chunk-SDPT5R2F.js
                                └── chunk-SDPT5R2F.js.map
                                └── chunk-WSIGJUT4.js
                                └── chunk-WSIGJUT4.js.map
                                └── chunk-XOK632QO.js
                                └── chunk-XOK632QO.js.map
                                └── package.json
                                └── _metadata.json
                            └── 📁deps_temp_0686e6ed
                                └── @angular_common.js
                                └── @angular_common.js.map
                                └── @angular_common_http.js
                                └── @angular_common_http.js.map
                                └── @angular_core.js
                                └── @angular_core.js.map
                                └── @angular_forms.js
                                └── @angular_forms.js.map
                                └── @angular_platform-browser.js
                                └── @angular_platform-browser.js.map
                                └── @angular_router.js
                                └── @angular_router.js.map
                                └── chunk-N4DUWSRY.js
                                └── chunk-N4DUWSRY.js.map
                                └── chunk-SDPT5R2F.js
                                └── chunk-SDPT5R2F.js.map
                                └── chunk-WSIGJUT4.js
                                └── chunk-WSIGJUT4.js.map
                                └── chunk-XOK632QO.js
                                └── chunk-XOK632QO.js.map
                                └── package.json
                        └── 📁web
                            └── .tsbuildinfo
            └── .editorconfig
            └── .gitignore
            └── 📁.vscode
                └── extensions.json
                └── launch.json
                └── tasks.json
            └── angular.json
            └── package-lock.json
            └── package.json
            └── 📁public
                └── favicon.ico
            └── README.md
            └── 📁src
                └── 📁app
                    └── 📁admin
                        └── 📁admin-dashboard
                            └── admin-dashboard.component.html
                            └── admin-dashboard.component.scss
                            └── admin-dashboard.component.spec.ts
                            └── admin-dashboard.component.ts
                        └── admin-routing.module.ts
                        └── admin.module.ts
                        └── 📁manage-puppies
                            └── manage-puppies.component.html
                            └── manage-puppies.component.scss
                            └── manage-puppies.component.spec.ts
                            └── manage-puppies.component.ts
                        └── 📁puppy-form
                            └── puppy-form.component.html
                            └── puppy-form.component.scss
                            └── puppy-form.component.spec.ts
                            └── puppy-form.component.ts
                    └── app.component.html
                    └── app.component.scss
                    └── app.component.spec.ts
                    └── app.component.ts
                    └── app.config.ts
                    └── app.routes.ts
                    └── 📁components
                        └── 📁adoption-form
                            └── adoption-form.component.html
                            └── adoption-form.component.scss
                            └── adoption-form.component.spec.ts
                            └── adoption-form.component.ts
                        └── 📁home
                            └── home.component.html
                            └── home.component.scss
                            └── home.component.spec.ts
                            └── home.component.ts
                        └── 📁puppy-details
                            └── puppy-details.component.html
                            └── puppy-details.component.scss
                            └── puppy-details.component.spec.ts
                            └── puppy-details.component.ts
                        └── 📁puppy-list
                            └── puppy-list.component.html
                            └── puppy-list.component.scss
                            └── puppy-list.component.spec.ts
                            └── puppy-list.component.ts
                        └── 📁thank-you
                            └── thank-you.component.html
                            └── thank-you.component.scss
                            └── thank-you.component.spec.ts
                            └── thank-you.component.ts
                    └── 📁interfaces
                        └── pagination-metadata.ts
                        └── pagination-params.ts
                        └── puppy-list-pagination.ts
                        └── puppy.ts
                    └── 📁services
                        └── puppy.service.spec.ts
                        └── puppy.service.ts
                └── 📁environments
                    └── environment.ts
                └── index.html
                └── main.ts
                └── styles.scss
            └── tailwind.config.js
            └── tsconfig.app.json
            └── tsconfig.json
            └── tsconfig.spec.json
    └── LICENSE.md
    └── package.json
    └── pnpm-lock.yaml
    └── pnpm-workspace.yaml
    └── README.md
    └── tsconfig.json
```