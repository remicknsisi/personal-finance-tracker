class Tag < ApplicationRecord
    has_many :transactions, dependent: :destroy
    # has_many :budgets, dependent: :destroy

    validates :keyword, presence: true

    validate :tag_exists

    def tag_exists
        tags = Tag.all
        result = tags.find{|t| t.keyword == self.keyword }
        if result
            errors.add(:user, "has already created a tag with this name")
        end
    end
end