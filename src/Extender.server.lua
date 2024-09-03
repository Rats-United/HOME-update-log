local frame = script.Parent.SurfaceGui.ScrollingFrame;
local Extend = script.Parent.Extend;


local reached = false;
local max = false;


frame:GetPropertyChangedSignal("CanvasPosition"):Connect(function()
	
	if max then return end;
	
	local bottom = math.round((frame.CanvasSize.Y.Offset - frame.AbsoluteSize.Y));
	local pos = -math.round(frame.CanvasPosition.Y);
	
	if pos <= bottom and not reached then
		
		coroutine.wrap(function()
			
		end)
		
		Extend:FireServer();
		
	elseif pos > bottom then
		reached = false;
	end
end)


Extend.OnClientEvent:Connect(function()
	max = true;
end)
