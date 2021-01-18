import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isDrawerOpen: {
          read() {
            return isUserAuthenticatedVar();
          },
        },
        cart: {
          read() {
            return {
              products: usersVar(),
              cartCount: usersVar().length,
            };
          },
        },
      },
    },
  },
});

export const isUserAuthenticatedVar = cache.makeVar(false);

export const usersVar = cache.makeVar([]);
