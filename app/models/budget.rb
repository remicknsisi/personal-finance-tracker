class Budget < ApplicationRecord
    belongs_to :user
    belongs_to :tag

    validates :amount, presence: true
    validates :user_id, presence: true
    validates :tag_id, presence: true

    validate :budget_exists

    def budget_exists
        budgets = Budget.all
        result = budgets.find{|b| b.user_id == self.user_id && b.tag_id == self.tag_id && b.amount == self.amount}
        if result
            errors.add(:user, "has already created a budget with this name and amount!")
        end
    end
end