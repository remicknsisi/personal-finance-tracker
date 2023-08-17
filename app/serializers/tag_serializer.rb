class TagSerializer < ActiveModel::Serializer
  attributes :id, :keyword

  has_many :transactions
  belongs_to :budget
end
