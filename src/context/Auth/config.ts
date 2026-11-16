import { LogLevel, AccountInfo } from '@azure/msal-browser'
import { CLIENT_ID, AUTH_AUTHORITY, AUTH_REDIRECT_URI, AUTH_POST_LOGOUT_REDIRECT_URI, ENTRA_CLIENT_ID } from '@/config'

export const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: AUTH_AUTHORITY,
        redirectUri: AUTH_REDIRECT_URI,
        postLogoutRedirectUri: AUTH_POST_LOGOUT_REDIRECT_URI,
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
}

export const loginRequest = {
    scopes: ["openid", "profile"],
    redirectUri: AUTH_REDIRECT_URI
}

export const acquireRequest = (account: AccountInfo) => ({
    scopes: [`${ ENTRA_CLIENT_ID }/.default`],
    account
})