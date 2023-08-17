class BudgetSerializer < ActiveModel::Serializer
  attributes :id, :amount

  belongs_to :user
  belongs_to :tag
end
