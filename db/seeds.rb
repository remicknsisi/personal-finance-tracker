puts "🌱 Seeding data..."

User.create(name: "Sisi Remick", email: "remicknsisi@gmail.com", password: "password", password_confirmation: "password")

4.times do
    Budget.create(
        amount: rand(1..20),
        user_id: 1
    )
end

puts "✅ Done seeding!"