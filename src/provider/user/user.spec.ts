import { TestBed } from '@angular/core/testing';
import { User } from './user';
import { AuthService } from 'src/app/pages/login/services/auth.service';
import { ErpHttpClient } from '../HttpServices/internal/ErpHttpClient';
import { Doctypes } from '../tools/NIX_DOCTYPES';
import { NIX_STORAGE } from '../tools/NIX_STORAGE';
import { SqlHttpClient } from '../HttpServices/internal/SqlHttpClients';

describe('User', () => {
  let AuthServiceMock: Partial<AuthService>
  let ErpHttpClientMock: Partial<ErpHttpClient>
  let DoctypesMock: Partial<Doctypes>
  let NIX_STORAGEMock: Partial<NIX_STORAGE>
  let SqlHttpClientMock: Partial<SqlHttpClient>

  beforeEach(() => {
    AuthServiceMock = {}
    ErpHttpClientMock = {}
    DoctypesMock = {}
    NIX_STORAGEMock = {}


    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: ErpHttpClient, useValue: ErpHttpClientMock },
        { provide: Doctypes, useValue: DoctypesMock },
        { provide: NIX_STORAGE, useValue: NIX_STORAGEMock },
        { provide: SqlHttpClient, useValue: SqlHttpClientMock },
      ]
    });

  })


  it('should create an instance', () => {
    const user = new User(
      TestBed.inject(ErpHttpClient),
      TestBed.inject(Doctypes),
      TestBed.inject(NIX_STORAGE),
      TestBed.inject(AuthService),
      TestBed.inject(SqlHttpClient),
      )
    expect(user).toBeTruthy();
  });
});
