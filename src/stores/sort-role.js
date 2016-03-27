module.exports = {
    sort: function (sort, done) {
        done(null, (this.opt.sort = sort))
    }
}
