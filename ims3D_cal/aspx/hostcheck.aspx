<%--
/*
• This piece of information is originated by and the intellectual property of Esri China (Hong Kong) Limited.
• Name of Code Originator: Esri's team
• Creation Date: 3 March 2022
• Description/Purpose: ip checking
• Required Inputs: N/A
• Expected Outputs: client ip
• Description of Modification: removing obsoleted code
• Modification Date: 20 September 2022
• Modified By: Esri's team
 */
 --%>
<%
Response.Write(Request.ServerVariables("LOCAL_ADDR"))
Page.ClientScript.RegisterClientScriptBlock(Page.GetType, "initMyClientVariable", "var myip="+Request.ServerVariables("LOCAL_ADDR"), True)
%>
