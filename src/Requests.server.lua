local base = "https://github.com/repos/Rats-United/HOME-update-log/contents/logs";


local limitTime = 5;
local limitType = "minutes";



local HttpService = game:GetService("HttpService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")


local BaseLabel = script.Parent.BaseLabel;
local BaseSep = script.Parent.BaseSep;

local frame = script.Parent.SurfaceGui.ScrollingFrame;

local endText = frame.EndSpinner.Text;
local failText = frame.EndSpinner.FailText;

local MDify = require(script.Parent.MDify);


endText.Visible = false;


local lt = limitTime;
if limitType == "minute" or limitType == "minutes" then
	lt *= 60;
elseif limitType == "hour" or limitType == "hours" then
	lt *= (lt * 60)
end


local baseTransparency = frame.ScrollBarImageTransparency;
local failed = false;


local function fetchFromGitHub(url)
	
	if not url then return end;
	
	local response = HttpService:RequestAsync({
		Url = url,
		Method = "GET"
	});
	
	
	if response.Success then
		
		if failed then
			failText.Parent.Rat.Script.Enabled = true;

			failText.Visible = false;

			frame.ScrollingEnabled = true;
			frame.ScrollBarImageTransparency = baseTransparency;
		end
		
		local success, data = pcall(function()
			return HttpService:JSONDecode(response.Body);
		end)
		
		if success then
			return data;
		else
			return response;
		end
	else
		failText.Parent.Rat.Script.Enabled = false;
		
		failText.Text = string.format("I got rate limited so I can't get any logs\nwill try again in %d %s.", limitTime, limitType);
		failText.Visible = true;
		
		frame.ScrollingEnabled = false;
		frame.ScrollBarImageTransparency = 1;
		
		failed = true;
		
		
		wait(lt);
		
		
		failText.Parent.Rat.Script.Enabled = true;

		failText.Text = "retrying...";
		
		
		wait(2);
		
		
		fetchFromGitHub(url);
	end
end


if not string.match(base, "api.github.com") then
	base = string.gsub(base, "github.com", "api.github.com");
end


local rawlogs = fetchFromGitHub(base);


local logs = {};


for i, dir in ipairs(rawlogs) do
	
	-- print(string.match(string.lower(dir.name), "log"), dir.type == "dir", (not string.match(string.lower(dir.name), ".md")));
	
	if (dir.type == "dir") and (not string.match(string.lower(dir.name), ".md")) then
		table.insert(logs, dir._links.self);
	end
end


function split(str, delimiter)
	local result = { }
	local from  = 1
	local delim_from, delim_to = string.find( str, delimiter, from  )
	while delim_from do
		table.insert( result, string.sub( str, from , delim_from-1 ) )
		from  = delim_to + 1
		delim_from, delim_to = string.find( str, delimiter, from  )
	end
	table.insert( result, string.sub( str, from  ) )
	return result
end


function starts(String,Start)
	return string.sub(String,1,string.len(Start))==Start
end


local format = {};


function format.getRichHtml(key)
	for i, f in ipairs(format.html) do
		if f[1] == key then
			return f[2];
		end
	end
end


function format.getRichMarkdown(key)
	for i, f in ipairs(format.markdown) do
		if f[1] == key then
			return f[2];
		end
	end
end


local extrasize = BaseLabel.TextSize - 14


local h1 = 34 + extrasize;
local h2 = 30 + extrasize;
local h3 = 24 + extrasize;
local h4 = 20 + extrasize;


local function headerScale(s)
	return string.format("<font size=\"%d\">", s);
end


format.html = {

	{ "<h1>", headerScale(h1) },
	{ "</h1>", "</font>" },

	{ "<h2>", headerScale(h2) },
	{ "</h2>", "</font>" },

	{ "<h3>", headerScale(h3) },
	{ "</h3>", "</font>" },

	{ "<h4>", headerScale(h4) },
	{ "</h4>", "</font>" },

	{ "<br>", "\n" },
}


format.markdown = {

	{ "#", format.getRichHtml("<h1>"), "</font>" },
	{ "##", format.getRichHtml("<h2>"), "</font>" },
	{ "###", format.getRichHtml("<h3>"), "</font>" },
	{ "-", "	• " }

}


function replaceMd(str, new_substring)
	return string.gsub(str, "(%W+)", new_substring, 1)
end


local logNum = 1;
local i = 0;


local topSep = BaseSep:Clone();
topSep.Parent = frame
topSep.Name = "TopSep";
topSep.LayoutOrder = 0;


local function fetchLogs(i)
	
	local data = fetchFromGitHub(logs[i]);
	
	if not data then return end;


	for _, d in pairs(data) do
		
		local response = fetchFromGitHub(d.download_url);
		
		i += 1;
		
		
		if response.Success then
			
			local label = BaseLabel:Clone();
			label.Parent = frame
			label.Name = "LogLabel"..i;
			label.LayoutOrder = i;
			
			
			local sep = BaseSep:Clone();
			sep.Parent = frame
			sep.Name = "Sep"..i;
			sep.LayoutOrder = i;
			
			
			local body = response.Body -- MDify.MarkdownToRichText(response.Body);
			
			
			local bodylines = split(body, "\n");
			
			
			for i, line in ipairs(bodylines) do
				
				for _, f in pairs(format.markdown) do
					
					if starts(line, (f[1].." ")) then
						
						local text = replaceMd(line, f[2]);
						
						-- print(f[3]);
						
						if f[3] then
							text = text..f[3];
						end
						
						bodylines[i] = text;
					end
					
				end
			end
			
			
			
			
			
			body = table.concat(bodylines, "\n");
			
			
			for _, f in pairs(format.html) do
				body = string.gsub(body, f[1], f[2]);
			end
			
			
			label.Text = body
			
		end
	end
end


fetchLogs(logNum);


local Extend = script.Parent.Extend;
local cooldown = false;


Extend.OnServerEvent:Connect(function()
	
	if not cooldown then
		logNum += 1;
		fetchLogs(logNum);
		cooldown = true;
		
		task.delay(1, function()
			cooldown = false;
		end);
		
		if logNum > #logs then
			Extend:FireAllClients()
			endText.Visible = true;
		end
	end
	
end)
