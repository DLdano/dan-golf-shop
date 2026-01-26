import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignedOutComponent } from './user/signed-out/signed-out.component';
import { adminGuard } from './admin/admin-guard';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signedout', component: SignedOutComponent },
  { path: 'admin', canActivate: [adminGuard], loadComponent: () => Promise.resolve(AdminComponent) },
  { path: 'account', loadComponent: () => Promise.resolve(AccountComponent) },
  { path: '**', redirectTo: '' }
];
