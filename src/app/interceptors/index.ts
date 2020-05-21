import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ConvertInterceptor } from './convert.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { FakeInterceptor } from './fake.interceptor';
import { HeaderInterceptor } from './header.interceptor';
import { HttpsInterceptor } from './https.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { NotifyInterceptor } from './notify.interptor';
import { ProfilerInterceptor } from './profiler.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ConvertInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: FakeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ProfilerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NotifyInterceptor, multi: true },
];
