module.exports = {
    getTodo: function (todo, done) {
        done(null, (this.opt.todo = todo))
    }
}
