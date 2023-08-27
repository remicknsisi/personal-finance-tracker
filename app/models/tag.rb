class Tag < ApplicationRecord
    has_many :transactions, dependent: :destroy
    has_many :budgets, dependent: :destroy

    validates :keyword, presence: true
end