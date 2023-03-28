# Auth App NestJS

## Description

REST API built with [NestJS](https://docs.nestjs.com/). It provides a boilerplate for custom Node.js authentication using [Passport.js](https://www.passportjs.org/). It has **Google** and **Local** strategies implemented. Main version is based on **server sessions with cookies** using **PostgreSQL** as a [session store](https://github.com/voxpelli/node-connect-pg-simple)

**Note:** This Code base is meant to be used as a **_template_** for other projects.

## Live Example

Curl the live example deployed on [Railway](https://railway.app/)

```bash
curl https://auth-app-nestjs-production.up.railway.app/
```

You will get the following if it is _currently online_ and succeeds:

```json
{ "statusCode": 404, "message": "Cannot GET /", "error": "Not Found" }
```

### Frontend

I built a [Angular](https://angular.io/) SPA that consumes it. Check out its repository [here](https://github.com/daguttt/auth-app-angular).

#### Preview 👇🏼

<a href='https://auth-app-angular.vercel.app/auth/login' align='center'>
  <img
      src='https://res.cloudinary.com/doju0qq96/image/upload/v1679676339/auth-app-angular-desktop_bd8vpy.png'
      alt='Auth App Desktop Image Previw'
      height="250px" />
  </a>

## Social

- [Linkedin](https://linkedin.com/in/daguttt)
- [Twitter](https://twitter.com/daguttt)
