class Budget < ApplicationRecord
    belongs_to :user
    # belongs_to :tag

    validates :amount, presence: true
    validates :user_id, presence: true
end