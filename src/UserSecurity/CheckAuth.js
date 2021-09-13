class CheckAuth {
    constructor() {
        this.Uauthenticated = false
        this.Aauthenticated = false
        this.Eauthenticated = false
    }
    Ulogin(ub) {
        this.Uauthenticated = true
        ub()
    }
    Alogin(ab) {
        this.Aauthenticated = true
        ab()
    }
    Elogin(eb) {
        this.Eauthenticated = true
        eb()
    }
    Ulogout(ub) {
        this.Uauthenticated = false
        ub()
    }
    Alogout(ab) {
        this.Aauthenticated = false
        ab()
    }
    Elogout(eb) {
        this.Eauthenticated = false
        eb()
    }
    isUAuthenticated() {
        return this.Uauthenticated;
    }
    isAAuthenticated() {
        return this.Aauthenticated;
    }
    isEAuthenticated() {
        return this.Eauthenticated;
    }
    isUserAuthenticated() {
        if (localStorage.getItem('userToken') !== null) {
            if (localStorage.getItem('userRole') === "ROLE_ADMIN") {
                this.Aauthenticated = true
            }
            if (localStorage.getItem('userRole') === "ROLE_USER") {
                this.Uauthenticated = true
            }
            if (localStorage.getItem('userRole') === "ROLE_EXECUTIVE") {
                this.Eauthenticated = true
            }
        }
        return false;
    }
}
export default new CheckAuth()