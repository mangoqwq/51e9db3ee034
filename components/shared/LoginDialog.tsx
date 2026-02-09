'use client';

import { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/auth-context';

type LoginDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleClose = () => {
    onClose();
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} size="sm" title="Login">
      <DialogHeader>
        <Heading level="h2" size="md">
          Login
        </Heading>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <DialogBody className="space-y-4">
          {error && (
            <Text variant="small" className="text-red-500">
              {error}
            </Text>
          )}

          <Input
            label="Username"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            required
          />
        </DialogBody>

        <DialogFooter>
          <Button type="submit" variant="primary" className="flex-1">
            Login
          </Button>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
