# login-form-angular

### CHECK ENVIROMENT
```bash
which ng
ng version
```

### INSTALL ENVIROMENT
```bash
npm install -g @angular/cli@latest
ng version
```

### UPDATE ENVIROMENT
```bash
ng update @angular/cli@20 @angular/core@20
ng update @angular/cli@21 @angular/core@21
```

### CREATE PROJECT
```bash
ng new login-form-angular --standalone --style=css --skip-git
cd login-form-angular
```

### INSTALL bootstrap, angular-fontawesome components
```bash
npm i bootstrap \
      @fortawesome/angular-fontawesome \
      @fortawesome/fontawesome-svg-core \
      @fortawesome/free-solid-svg-icons \
      @fortawesome/free-regular-svg-icons \
      @fortawesome/free-brands-svg-icons
```

### Add bootstrap to application style (src/styles.css)
```css
@import "bootstrap/dist/css/bootstrap.min.css";
```

### USE fontawesome icons in component (src/app/app.ts)
```ts
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAngular } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  imports: [
    FaIconComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  icons = { faAngular };
  readonly title: string = 'Angular - Bootstrap - Fontawesome';
}
```

### USE fontawesome icons in page (src/app/app.html)
```xml
<div class="container">
  <div class="row mt-5">
    <h1 class="text-center">
      <fa-icon [icon]="icons.faAngular" 
                class="text-danger fa-2xl me-2"></fa-icon>
      {{ title }}
    </h1>
  </div>
</div>
```

### RUN from login-form-angular directory
```bash
ng serve
```
