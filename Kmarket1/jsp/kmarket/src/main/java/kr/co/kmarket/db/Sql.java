package kr.co.kmarket.db;

public class Sql {
	
	//product
	public static final String INSERT_PRODUCT       = "insert into `km_product` set "
													+ "`proNo`=?,"
													+ "`cate1`=?,"
													+ "`cate2`=?,"
													+ "`proName`=?,"
													+ "`descript`=?,"
													+ "`company`=?,"
													+ "`seller`=?,"
													+ "`price`=?,"
													+ "`discount`=?,"
													+ "`point`=?,"
													+ "`stock`=?,"
													+ "`sold`=?,"
													+ "`delivery`=?,"
													+ "`hit`=?,"
													+ "`score`=?,"
													+ "`review`=?,"
													+ "`thumb1`=?,"
													+ "`thumb2`=?,"
													+ "`thumb3`=?,"
													+ "`detail`=?,"
													+ "`status`=?,"
													+ "`duty`=?,"
													+ "`bizType`=?,"
													+ "`origin`=?,"
													+ "`ip`=?,"
													+ "`rdate`=NOW()"
													+ "`etc1`=?,"
													+ "`etc2`=?,"
													+ "`etc3`=?,"
													+ "`etc4`=?,"
													+ "`etc5`=?,";
	
	// product_cart
	public static final String INSERT_PRODUCT_CART      = "insert into `km_product_cart` set "
														+ "`cartNo`=?,"
														+ "`uid`=?,"
														+ "`proBo`=?,"
														+ "`count`=?,"
														+ "`price`=?,"
														+ "`discount`=?,"
														+ "`point`=?,"
														+ "`delivery`=?,"
														+ "`total`=?,"
														+ "`rdate`=NOW()";
	
	// product_order
	public static final String INSERT_PRODUCT_ORDER       = "insert into `km_product_order` set "
														+ "`ordNo`=?,"
														+ "`uid`=?,"
														+ "`ordCount`=?,"
														+ "`ordPrice`=?,"
														+ "`ordDiscount`=?,";

}
