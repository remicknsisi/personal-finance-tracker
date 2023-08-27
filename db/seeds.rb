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
    amount: 400,
    user_id: 1,
    tag_id: 1
)
Budget.create(
    amount: 1500,
    user_id: 1,
    tag_id: 2
)
Budget.create(
    amount: 150,
    user_id: 1,
    tag_id: 3
)
Budget.create(
    amount: 250,
    user_id: 1,
    tag_id: 4
)
Budget.create(
    amount: 100,
    user_id: 1,
    tag_id: 5
)
Budget.create(
    amount: 200,
    user_id: 1,
    tag_id: 6
)

2.times do
    Transaction.create(
        amount: rand(1.00..200.00).round(2),
        date: Date.today,
        description: "description!",
        payment_method: "Visa",
        user_id: 1,
        tag_id: 1
    )
end
2.times do
    Transaction.create(
        amount: rand(1.00..200.00).round(2),
        date: Date.today,
        description: "description!",
        payment_method: "Cash",
        user_id: 1,
        tag_id: 2
    )
end
2.times do
    Transaction.create(
        amount: rand(1.00..200.00).round(2),
        date: Date.today,
        description: "description!",
        payment_method: "Amex",
        user_id: 1,
        tag_id: 3
    )
end
2.times do
    Transaction.create(
        amount: rand(1.00..200.00).round(2),
        date: Date.today,
        description: "description!",
        payment_method: "Discover",
        user_id: 1,
        tag_id: 4
    )
end
2.times do
    Transaction.create(
        amount: rand(1.00..200.00).round(2),
        date: Date.today,
        description: "description!",
        payment_method: "Cash",
        user_id: 1,
        tag_id: 5
    )
end
2.times do
    Transaction.create(
        amount: rand(1.00..200.00).round(2),
        date: Date.today,
        description: "description!",
        payment_method: "Amex",
        user_id: 1,
        tag_id: 6
    )
end

puts "✅ Done seeding!"