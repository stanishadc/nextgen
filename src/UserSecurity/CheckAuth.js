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
    Slogin(cb) {
        this.Sauthenticated = true
        cb()
    }
}
export default new CheckAuth()