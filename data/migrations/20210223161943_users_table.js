
exports.up = function(knex) {
  return knex.schema
//   .createTable("roles", tbl => {
//       tbl.increments()
//   })
  .createTable("users", tbl => {
      tbl.increments();
      tbl.string("username",128).unique().notNullable();
      tbl.string("password",200).notNullable();
    //   tbl.integer("role")
    //   .unsigned()
    //   .references("roles.id")
    //   .onDelete("RESTRICT")
    //   .onUpdate("CASCADE")
    //   .defaultTo(2)
  })
};

exports.down = function(knex) {
    return knex.schema
    // .dropTableIfExist("roles")
    .dropTableIfExists("users")
};
