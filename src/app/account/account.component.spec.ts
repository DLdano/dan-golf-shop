import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AuthService } from '../user/auth.service';

class MockAuthService {
  getUserClaims() {
    return { firstName: 'Dan', lastName: 'Lee', email: 'dan@example.com', role: 'admin' };
  }
}

describe('AccountComponent', () => {
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
    fixture = TestBed.createComponent(AccountComponent);
    fixture.detectChanges();
  });

  it('displays user claims', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Dan');
    expect(text).toContain('Lee');
    expect(text).toContain('dan@example.com');
  });
});