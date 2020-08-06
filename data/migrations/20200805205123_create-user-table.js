
exports.up = function(knex) {
  knex.schema.createTable('users', tbl => {
    tbl.string('username').unique();
    tbl.string('pasword');
  })
};

exports.down = function(knex) {
  knex.schema.DropTableIfExists("users")
};
