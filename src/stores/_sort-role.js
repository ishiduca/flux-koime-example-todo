module.exports = {
    sort: function (payload, done) {
        done(null, (this.opt.sort = payload))
    }
}
