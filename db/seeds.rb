require 'date'

puts "🌱 Seeding data..."

User.create(name: "Sisi Remick", email: "remicknsisi@gmail.com", password: "password", password_confirmation: "password")

6.times do
    Budget.create(
        amount: rand(1..20),
        user_id: 1
    )
end

Tag.create(keyword: "Groceries", budget_id: 1)
Tag.create(keyword: "Rent", budget_id: 2)
Tag.create(keyword: "Utilities", budget_id: 3)
Tag.create(keyword: "Entertainment", budget_id: 4)
Tag.create(keyword: "Pet", budget_id: 5)
Tag.create(keyword: "Misc", budget_id: 6)

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