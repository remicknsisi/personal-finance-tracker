class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :amount, :user_id, :tag_id

  belongs_to :user
  belongs_to :tag
end
