require 'date'

puts "🌱 Seeding data..."

User.create(name: "Sisi Remick", email: "remicknsisi@gmail.com", password: "password", password_confirmation: "password")

Tag.create(keyword: "Groceries")
Tag.create(keyword: "Rent")
Tag.create(keyword: "Utilities")
Tag.create(keyword: "Entertainment")
Tag.create(keyword: "Pet")
Tag.create(keyword: "Misc")

Budget.create(
    amount: rand(1..20),
    user_id: 1,
    tag_id: 1
)
Budget.create(
    amount: rand(1..20),
    user_id: 1,
    tag_id: 2
)
Budget.create(
    amount: rand(1..20),
    user_id: 1,
    tag_id: 3
)
Budget.create(
    amount: rand(1..20),
    user_id: 1,
    tag_id: 4
)
Budget.create(
    amount: rand(1..20),
    user_id: 1,
    tag_id: 5
)
Budget.create(
    amount: rand(1..20),
    user_id: 1,
    tag_id: 6
)

10.times do
    Transaction.create(
        amount: rand(1.00..200.00),
        date: Date.today,
        description: "description!",
        payment_method: "Amex",
        user_id: 1,
        tag_id: rand(1..6)
    )
end

puts "✅ Done seeding!"