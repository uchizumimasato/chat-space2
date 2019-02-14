# README

## usersテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|name    |varchar(15) |null: false, unique: true, index: true|
|email   |varchar(255)|null: false, unique: true             |
|password|varchar(255)|null: false, unique: true             |

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :messages

## membersテーブル
|Column  |Type      |Options|
|--------|----------|-------|
|user_id |references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|name    |varchar(255)|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :messages

## messagesテーブル
|Column  |Type        |Options|
|--------|------------|-------|
|body    |text        |                              |
|image   |varchar(255)|                              |
|user_id |references  |null: false, foreign_key: true|
|group_id|references  |null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
