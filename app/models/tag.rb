class Tag < ApplicationRecord
    has_many :transactions

    validates :keyword, presence: true
end