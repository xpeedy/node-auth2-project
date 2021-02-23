const db = require("../../data/connection")

function find() {
    return db("users")
    // .join("roles","users.role","=","roles.id")
    // .select("users.id","users.username","roles.name as role")
    .select("users.id","users.username")
}

function findBy(filter) {
    return db("users")
    // .join("roles","users.role","=","roles.id")
    // .select("users.id","users.username", "roles.name as role", "users.password")
    .select("users.id","users.username", "users.password")
    .where(filter)
}
function findById(id) {
    return db("users")
    // .join("roles","users.role","=","roles.id")
    // .select("users.id","users.username","roles.name as role")
    .select("users.id","users.username")
    .where("users.id",id)
    .first()
}

async function add(user) {
    const [id] = await db("users").insert(user,"id")
    return findById(id)
}

module.exports = {
    find,
    findBy,
    add,
    findById
}