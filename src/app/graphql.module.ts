import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from '@ngx-auth/core';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink, authService: AuthService) {
    const uri = '/graphql';
    const http = httpLink.create({ uri });
    const auth = setContext((_, { headers }) => {
      const token = authService.token;
      if (!token) {
        return {};
      } else {
        return {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
      }
    });

    const error = onError(({ networkError, graphQLErrors }) => {
      const netErr = networkError as HttpErrorResponse;
      if (netErr.status === 401) {
        authService.invalidate();
      }
    });

    apollo.create({
      link: error.concat(auth).concat(http),
      cache: new InMemoryCache()
    });
  }
}
