class User < ApplicationRecord
    has_secure_password
    has_many :budgets, dependent: :destroy
    has_many :transactions, dependent: :destroy
    has_many :tags, through: :transactions
end