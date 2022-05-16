GREET_EN="Hello World"
echo "$GREET_EN"

# 文字列結合
GREET_CONCAT="$GREET_EN""晚上好"
echo "$GREET_CONCAT"

# 文字列長さ
echo ${#GREET_EN}
echo ${#GREET_CONCAT}
