const config = {
  development: {
    db: 'mongodb://127.0.0.1/graphql',
    app: {
      name: 'graphql'
    },
    auth: {
      token: {
        secret: '--some-secret-here--',
        expiresIn: '2 days'
      },
      google: {
        clientID: '623272395666-9t1hpgmm1k609kjvq4s8kf88abuh1jlt.apps.googleusercontent.com',
        clientSecret: '0ZyfYTKZO7Tj0Q6g_vFN5RdZ',
      }
    }
  },
  production: {
    db: 'mongodb://<username>:<password>@ds157325.mlab.com:57325/graphql-api',
    app: {
      name: 'graphql'
    }
  }
};

export default function(env) {
  return config[env];
}
