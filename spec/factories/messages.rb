FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image   File.open("#{Rails.root}/public/uploads/message/image/9/icon.jpg")
    user
    group
  end
end
