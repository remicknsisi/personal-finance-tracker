class Transaction < ApplicationRecord
    # belongs_to :tag
    # belongs_to :user

    validates :amount, presence: true
    validates :description, presence: true
    validates :date, presence: true
    validates :payment_method, presence: true
end