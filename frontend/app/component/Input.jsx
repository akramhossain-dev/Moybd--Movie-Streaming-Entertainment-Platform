import React from 'react';

const Input = ({ icon: Icon, ...props }) => (
    <div className="relative">
        {Icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-foreground-muted">
                <Icon />
            </div>
        )}
        <input
            {...props}
            className="block w-full py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-foreground border border-purple-900/40 rounded-xl bg-background placeholder:text-foreground-muted focus:outline-none focus:border-primary transition-colors"
        />
    </div>
);

export default Input;
