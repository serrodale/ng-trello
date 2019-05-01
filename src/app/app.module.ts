import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoadingDirective } from './directives/loading.directive';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';
import { BoardComponent } from './pages/board/board.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ListComponent } from './pages/board/list/list.component';
import { EditableDirective } from './directives/editable.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ModalComponent } from './components/modal/modal.component';
import { TaskComponent } from './pages/board/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ListComponent,
    BoardComponent,
    ModalComponent,
    LoginComponent,
    AlertComponent,
    TooltipDirective,
    LoadingDirective,
    RegisterComponent,
    EditableDirective,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
